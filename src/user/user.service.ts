import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { ProductService } from 'src/product/product.service';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends CRUDService<User, UserRepository> {
  constructor(
    @InjectRepository(UserRepository) repository: UserRepository,
    private productService: ProductService,
  ) {
    super(repository);
  }
}
