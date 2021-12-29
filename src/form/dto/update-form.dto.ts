import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { FormStatus } from '../entities/form.entity';
import { CreateFormDto } from './create-form.dto';

const { ACCEPTED, PENDING, REJECTED } = FormStatus;
export class UpdateFormDto extends PartialType(CreateFormDto) {
  @IsIn([ACCEPTED, PENDING, REJECTED])
  @ApiProperty({
    enum: FormStatus,
    default: PENDING,
  })
  status: FormStatus;
}
