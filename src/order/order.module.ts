import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    ProductModule,
    OrderDetailModule,
    UserModule,
    TypeOrmModule.forFeature([OrderRepository]),
  ],
})
export class OrderModule {}
