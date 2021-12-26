import { NotFoundException } from '@nestjs/common';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import {
  DeepPartial,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { BaseModel } from './base.entity';

@EntityRepository()
export class BaseRepository<
  Entity extends BaseModel,
> extends Repository<Entity> {
  async createItem(item: DeepPartial<Entity>) {
    const newItem = this.create(item);
    return newItem.save();
  }

  async findItemById(id: string) {
    const foundedItem = await this.findOne(id);
    if (foundedItem == null || foundedItem == undefined)
      throw new NotFoundException(`item with id ${id} not found`);
    return foundedItem;
  }
  async findOneItem(filter: FindOneOptions<Entity>) {
    const foundItem = await this.findOne(filter);
    if (foundItem == null || foundItem == undefined)
      throw new NotFoundException(
        `item not found \n ${JSON.stringify(filter)}`,
      );
    return foundItem;
  }

  async findItems(filter: FindManyOptions<Entity>) {
    const foundItems = await this.find(filter);
    return foundItems;
  }

  async paginateItems(
    options: IPaginationOptions,
    searchOption?: FindManyOptions<Entity>,
  ) {
    return paginate<Entity>(this, options, searchOption);
  }

  async updateItem(item: Partial<Entity>, id: string) {
    const itemToUpdate = await this.findItemById(id);
    Object.assign(itemToUpdate, item);
    return itemToUpdate.save();
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
