import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FindManyOptions } from 'typeorm';
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

  create(item: Entity) {
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

  paginate(
    option: IPaginationOptions,
    searchOptions?: FindManyOptions<Entity>,
  ) {
    return this.repository.paginateItems(option, searchOptions);
  }
}
