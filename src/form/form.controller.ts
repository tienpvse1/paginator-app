import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Form } from 'src/decorators/form.decorator';
import { HasRoles, Role } from 'src/decorators/role.decorator';
import { User } from 'src/decorators/user.decorator';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormStatus } from './entities/form.entity';
import { FormService } from './form.service';

@ApiTags('form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  /**
   * create form
   */
  @Post()
  create(@Body() createFormDto: CreateFormDto, @User('id') id: string) {
    return this.formService.createForm(createFormDto, id);
  }

  /**
   * get user form(base on current user session)
   */
  @Get()
  getFormById(@User('id') userId: string) {
    return this.formService.findForm(userId);
  }

  /**
   * get all form(for admin only)
   */
  @HasRoles(Role.ADMIN)
  @ApiQuery({
    name: 'num',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'size',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    enum: FormStatus,
    required: false,
  })
  @Get('admin')
  paginateForms(
    @Query('num', new DefaultValuePipe(1), ParseIntPipe) num = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Query(
      'status',
      new DefaultValuePipe(FormStatus.PENDING),
      new ParseEnumPipe(FormStatus),
    )
    status = FormStatus.PENDING,
  ) {
    return this.formService.paginate(
      {
        limit: size,
        page: num,
      },
      {
        where: {
          status,
        },
      },
    );
  }

  /**
   * update form for user
   */
  @Patch(':id')
  @ApiBody({ type: UpdateFormDto })
  update(@Param('id') id: string, @Form() updateForm: UpdateFormDto) {
    return this.formService.update(updateForm, id);
  }

  /**
   * update form status, which will affect user role also
   */
  @Patch('admin/:id')
  updateFormStatus(
    @Param('id') id: string,
    @Query(
      'status',
      new DefaultValuePipe(FormStatus.ACCEPTED),
      new ParseEnumPipe(FormStatus),
    )
    status: FormStatus,
  ) {
    return this.formService.updateFormStatus(id, status);
  }

  /**
   * delete form(experimental feature)
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.delete(id);
  }
}
