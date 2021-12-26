import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailRepository } from './order-detail.repository';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  imports: [TypeOrmModule.forFeature([OrderDetailRepository])],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}
