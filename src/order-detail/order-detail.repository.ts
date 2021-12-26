import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';

@EntityRepository(OrderDetail)
export class OrderDetailRepository extends BaseRepository<OrderDetail> {}
