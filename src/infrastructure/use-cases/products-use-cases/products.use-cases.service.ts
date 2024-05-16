import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from '@/repositories/product-repository/product.repository.service';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '@/dtos/product.dto';
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

  async getProductById(id: string): Promise<ProductEntity> {
    return await this.productRepository.getProductById(id);
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = ProductEntity.fromObject(product);
    return this.productRepository.createProduct(newProduct);
  }

  async updateProduct(id: string, payload: UpdateProductDto) {
    const product = ProductEntity.fromObject(payload);
    return this.productRepository.updateProduct(id, product);
  }

  async deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}
