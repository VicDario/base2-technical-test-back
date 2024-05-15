import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from '@/repositories/product-repository/product.repository.service';
import { CreateProductDto, FilterProductsDto } from '@/dtos/product.dto';
import { ProductEntity } from '@/entities/product.entity';
import {
  FilterProduct,
  Pagination,
  ProductsResult,
} from '@/domain/repositories/product.repository';

@Injectable()
export class ProductsUseCasesService {
  constructor(private productRepository: ProductRepositoryService) {}

  async getProducts(filter: FilterProductsDto): Promise<ProductsResult> {
    const pagination: Pagination = {
      offset: filter.offset,
      limit: filter.limit,
    };
    const queryFilter: FilterProduct = {};
    return await this.productRepository.getProducts(queryFilter, pagination);
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = ProductEntity.fromObject(product);
    return this.productRepository.createProduct(newProduct);
  }
}
