import { Length } from 'class-validator';

export class CreateFormDto {
  @Length(1, 50)
  title: string;

  description?: string;
}
