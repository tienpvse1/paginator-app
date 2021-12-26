import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { UserRepository } from 'src/user/user.repository';
import { getCustomRepository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService extends CRUDService<Product, ProductRepository> {
  constructor(
    @InjectRepository(ProductRepository) repository: ProductRepository,
  ) {
    super(repository);
  }

  async createProduct(product: CreateProductDto, userId: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOneItem({ where: { id: userId } });
    Object.assign(product, { user });
    return this.repository.createItem(product as Product);
  }

  async findMany(ids: string[]) {
    return this.repository.findByIds(ids);
  }
}
