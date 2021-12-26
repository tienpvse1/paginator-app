import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailRepository } from './order-detail.repository';

@Injectable()
export class OrderDetailService extends CRUDService<
  OrderDetail,
  OrderDetailRepository
> {
  constructor(
    @InjectRepository(OrderDetailRepository) repository: OrderDetailRepository,
  ) {
    super(repository);
  }
}
