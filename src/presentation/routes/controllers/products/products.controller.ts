import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsUseCasesService } from '@/use-cases/products-use-cases/products.use-cases.service';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '@/dtos/product.dto';
import { PaginationDto } from '@/dtos/query.dto';
import { ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from '@/infrastructure/pipes/mongo-id/mongo-id.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsUseCasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of products' })
  getProducts(
    @Query() pagination: PaginationDto,
    @Query() filter: FilterProductsDto,
  ) {
    return this.productService.getProducts(pagination, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Update product' })
  getProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productService.getProductById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  createProduct(@Body() payload: CreateProductDto) {
    return this.productService.createProduct(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product' })
  updateProduct(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productService.updateProduct(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Update product' })
  deleteProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productService.deleteProduct(id);
  }
}
