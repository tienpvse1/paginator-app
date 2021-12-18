import { PartialType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { BaseModel } from 'src/base/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseModel {
  @Column()
  @Length(10)
  name: string;
  @Column({ type: 'longtext' })
  @Length(20)
  description: string;
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export class ProductUpdateEntity extends PartialType(Product) {}
