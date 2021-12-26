import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcryptjs';
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
  async create(user: User) {
    // hash the password before save it to database
    Object.assign(user, { password: hashSync(user.password, 10) });
    const createdUser = await this.repository.createItem(user);
    return createdUser;
  }
}
