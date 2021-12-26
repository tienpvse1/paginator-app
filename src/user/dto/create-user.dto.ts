import { IsEnum, Length, Min } from 'class-validator';
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
  @IsEnum(Role)
  role: Role;
}
