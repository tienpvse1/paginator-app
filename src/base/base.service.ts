import { BadRequestException } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseModel } from './base.entity';
import { BaseRepository } from './base.repository';
export class CRUDService<
  Entity extends BaseModel,
  Repository extends BaseRepository<Entity>,
> {
  protected repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  create(item: DeepPartial<Entity>) {
    return this.repository.createItem(item);
  }
  findById(id: string) {
    return this.repository.findItemById(id);
  }

  update(item: Partial<Entity>, id: string) {
    return this.repository.updateItem(item, id);
  }

  delete(id: string) {
    return this.repository.deleteItem(id);
  }

  findAll() {
    return this.repository.findItems({});
  }

  async customFind(filter: FindManyOptions<Entity>) {
    try {
      const result = await this.repository.find(filter);
      return result;
    } catch (error) {
      throw new BadRequestException(
        'filter not in correct format\n visit https://typeorm.io/#/find-options for more info',
      );
    }
  }

  async findOne(filter: FindOneOptions<Entity>) {
    return this.repository.findOneItem(filter);
  }

  paginate(
    option: IPaginationOptions,
    searchOptions?: FindManyOptions<Entity>,
  ) {
    return this.repository.paginateItems(option, searchOptions);
  }
}
