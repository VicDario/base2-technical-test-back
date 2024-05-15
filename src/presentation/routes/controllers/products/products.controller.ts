import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsUseCasesService } from '@/use-cases/products-use-cases/products.use-cases.service';
import { CreateProductDto, FilterProductsDto } from '@/dtos/product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsUseCasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of products' })
  getProducts(@Query() filter: FilterProductsDto) {
    return this.productService.getProducts(filter);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  createProduct(@Body() payload: CreateProductDto) {
    return this.productService.createProduct(payload);
  }
}
