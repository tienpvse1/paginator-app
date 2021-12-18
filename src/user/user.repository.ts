import { LoginDto } from 'src/auth/dto/login.dto';
import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync } from 'bcryptjs';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  override async findOneItem(filter: FindOneOptions<User>): Promise<User> {
    const user = await this.findOne({
      ...filter,
      select: [
        'email',
        'age',
        'createdAt',
        'deletedAt',
        'id',
        'password',
        'role',
      ],
    });
    if (user == null || user == undefined)
      throw new NotFoundException('account not found');
    return user;
  }
  async login({ email, password }: LoginDto) {
    const user = await this.findOneItem({ where: { email } });
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();
    return user;
  }
}
