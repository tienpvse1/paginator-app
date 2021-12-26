import { BaseModel } from 'src/base/base.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class OrderDetail extends BaseModel {
  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;
}
