import { Length } from 'class-validator';

export class CreateProductDto {
  @Length(10)
  name: string;
  @Length(20)
  description: string;
}
