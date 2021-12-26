import { PartialType } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { BaseModel } from 'src/base/base.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
}

export class ProductUpdateEntity extends PartialType(Product) {}
