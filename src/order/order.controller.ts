import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @User('id') id: string) {
    return this.orderService.createOrder(createOrderDto, id);
  }

  @Get()
  paginate(
    @Query('num', new DefaultValuePipe('1'), ParseIntPipe) num = 1,
    @Query('size', new DefaultValuePipe('10'), ParseIntPipe) size = 10,
    @User('id') userId: string,
  ) {
    return this.orderService.paginate(
      {
        page: num,
        limit: size,
      },
      {
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['orderDetails', 'orderDetails.product', 'user'],
      },
    );
  }
}
