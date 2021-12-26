import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  items: OrderItem[];
}

export class OrderItem {
  @IsString()
  id: string;
  @IsNumber()
  quantity: number;
}
