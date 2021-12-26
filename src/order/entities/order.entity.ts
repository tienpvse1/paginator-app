import { BaseModel } from 'src/base/base.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Order extends BaseModel {
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
