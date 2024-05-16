import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from '@/repositories/product-repository/product.repository.service';
import { CreateProductDto, FilterProductsDto } from '@/dtos/product.dto';
import { ProductEntity } from '@/entities/product.entity';
import { ProductsResult } from '@/domain/repositories/product.repository';
import { PaginationDto } from '@/dtos/query.dto';

@Injectable()
export class ProductsUseCasesService {
  constructor(private productRepository: ProductRepositoryService) {}

  async getProducts(
    pagination: PaginationDto,
    filter: FilterProductsDto,
  ): Promise<ProductsResult> {
    return await this.productRepository.getProducts(filter, pagination);
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = ProductEntity.fromObject(product);
    return this.productRepository.createProduct(newProduct);
  }
}
