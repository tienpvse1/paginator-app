import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/decorators/user.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductUpdateEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Create the product
   */
  @Post()
  @ApiOperation({ summary: 'add a product into account' })
  create(@Body() product: CreateProductDto, @User('id') userId: string) {
    return this.productService.createProduct(product, userId);
  }

  /**
   * paginate all product
   */
  @Get()
  @ApiOperation({ summary: 'get all product in account and paginate them' })
  @ApiQuery({
    name: 'num',
    type: 'number',
    required: false,
    description: 'page index',
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    required: false,
    description: 'size of the page',
  })
  paginate(
    @Query('num', new DefaultValuePipe(1), ParseIntPipe) num = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
    @Req() request: Request,
    @User('id') userId: string,
  ) {
    return this.productService.paginate(
      {
        limit: size,
        page: num,
        route: request.url,
      },
      {
        where: {
          user: {
            id: userId,
          },
        },
      },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'get product by id' })
  @ApiParam({ name: 'id', type: 'string', description: "product's id" })
  findOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update product by id' })
  update(@Param('id') id: string, @Body() product: ProductUpdateEntity) {
    return this.productService.update(product, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete product by id' })
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
