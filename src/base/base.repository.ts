import { NotFoundException } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import {
  DeepPartial,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

@EntityRepository()
export class BaseRepository<T> extends Repository<T> {
  async createItem(item: DeepPartial<T>) {
    const newItem = this.create(item);
    return this.save(newItem);
  }

  async findItemById(id: string) {
    const foundedItem = await this.findOne(id);
    if (foundedItem == null || foundedItem == undefined)
      throw new NotFoundException(`item with id ${id} not found`);
    return foundedItem;
  }
  async findOneItem(filter: FindOneOptions<T>) {
    const foundItem = await this.findOne(filter);
    if (foundItem == null || foundItem == undefined)
      throw new NotFoundException(
        `item not found \n ${JSON.stringify(filter)}`,
      );
    return foundItem;
  }

  async findItems(filter: FindManyOptions<T>) {
    const foundItems = await this.find(filter);
    return foundItems;
  }

  async paginateItems(
    options: IPaginationOptions,
    searchOption?: FindManyOptions<T>,
  ) {
    return paginate<T>(this, options, searchOption);
  }

  async updateItem(item: Partial<T>, id: string) {
    const itemToUpdate = await this.findItemById(id);
    Object.assign(itemToUpdate, item);
    return this.save(itemToUpdate);
  }

  async deleteItem(id: string) {
    const result = await this.softDelete(id);
    if (result.affected < 0)
      throw new NotFoundException(
        `item with id ${id} cannot be found to delete`,
      );
    return result;
  }
}
