import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { FormStatus } from '../entities/form.entity';
import { CreateFormDto } from './create-form.dto';

export class UpdateFormDto extends PartialType(CreateFormDto) {
  @IsEnum(FormStatus)
  @ApiProperty({
    enum: FormStatus,
  })
  status: FormStatus;
}
