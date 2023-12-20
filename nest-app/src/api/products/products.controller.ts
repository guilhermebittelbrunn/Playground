import { CreateProduct } from './dto/create-product.dto';
import { GetProductByFilter } from './dto/get-products-by-filter.dto';
import { IProduct } from './product.model';
import { ProductsService } from './products.service';
import {
  Controller,
  Param,
  Post,
  Delete,
  Patch,
  Get,
  Body,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  findAll(@Query() productFilters: GetProductByFilter): IProduct[] {
    if (Object.keys(productFilters).length > 0) {
      return this.productService.findWithFilters(productFilters);
    }
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): IProduct | null {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() createProduct: CreateProduct): IProduct {
    return this.productService.create(createProduct);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.productService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string): IProduct {
    return this.productService.update(id);
  }
}
