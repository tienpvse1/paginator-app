import { ApiProperty } from '@nestjs/swagger';
import { IsIn, Length, Min } from 'class-validator';
import { Role } from 'src/decorators/role.decorator';

export class CreateUserDto {
  @Length(6)
  name: string;
  @Min(0)
  age: number;
  @Length(10)
  email: string;
  @Length(10)
  password: string;
  @IsIn([Role.USER, Role.MANAGER, Role.ADMIN])
  @ApiProperty({ default: Role.USER, enum: Role, type: Number })
  role: Role;
}
