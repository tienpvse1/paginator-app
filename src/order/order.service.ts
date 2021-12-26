import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService extends CRUDService<Order, OrderRepository> {
  constructor(
    @InjectRepository(OrderRepository) repository: OrderRepository,
    private productService: ProductService,
    private orderDetailService: OrderDetailService,
    private userService: UserService,
  ) {
    super(repository);
  }

  async createOrder(items: CreateOrderDto, userId: string) {
    const user = await this.userService.findById(userId);
    // create a new order
    const newOrder = this.repository.create();
    // assign it owner to current user
    newOrder.user = user;
    newOrder.orderDetails = [];
    for (const item of items.items) {
      const product = await this.productService.findById(item.id);
      const createdOrderDetail = await this.orderDetailService.create({
        quantity: item.quantity,
        product,
        order: newOrder,
      });
      newOrder.orderDetails.push(createdOrderDetail);
    }
    return this.create(newOrder);
  }
}
