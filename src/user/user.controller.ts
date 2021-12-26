import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { Public } from 'src/decorators/public.decorator';
import { HasRoles, Role } from 'src/decorators/role.decorator';
import { User as UserDecorator } from 'src/decorators/user.decorator';
import { FindManyOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * create account
   */
  @Post()
  @Public()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  /**
   * get all account and paginate them(for admin only)
   */
  @Get('paginate')
  @HasRoles(Role.ADMIN)
  paginateUser(
    @Query('num', new DefaultValuePipe(1), ParseIntPipe) num = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Req() req: Request,
  ) {
    const options: IPaginationOptions = {
      limit: size,
      page: num,
      route: req.url,
    };
    return this.userService.paginate(options);
  }
  /**
   * get account info(login required)
   */
  @Get('')
  findOne(@UserDecorator('id') id: string) {
    return this.userService.findById(id);
  }

  /**
   * custom getter
   */
  @Get('custom')
  @ApiBody({ type: Object })
  @ApiOperation({ description: 'custom getter, base on what you want' })
  customGetter(@Body() filter: FindManyOptions<User>) {
    return this.userService.customFind(filter);
  }

  /**
   * update account(login required)
   */
  @Patch('')
  update(@UserDecorator('id') id: string, @Body() user: User) {
    return this.userService.update(user, id);
  }

  /**
   * disable account(login required)
   */
  @Delete('')
  remove(@UserDecorator('id') id: string) {
    return this.userService.delete(id);
  }
}
