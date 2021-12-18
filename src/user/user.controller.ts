import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { HasRoles, Role } from 'src/decorators/role.decorator';
import { User as UserDecorator } from 'src/decorators/user.decorator';
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
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  /**
   * get all account and paginate them(for admin only)
   */
  @Get('paginate')
  @HasRoles(Role.ADMIN)
  paginateUser(
    @Query('num', ParseIntPipe) num = 1,
    @Query('size', ParseIntPipe) size = 10,
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
