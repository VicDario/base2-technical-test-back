import { Inject, Injectable } from '@nestjs/common';
import {
  FilterProduct,
  Pagination,
  ProductRepository,
  ProductsResult,
} from '@/domain/repositories/product.repository';
import { ProductEntity } from '@/domain/entities/product.entity';
import { ProductDatasource } from '@/domain/datasources/product.datasource';

@Injectable()
export class ProductRepositoryService implements ProductRepository {
  constructor(
    @Inject('ProductDatasource') private productDatasource: ProductDatasource,
  ) {}

  async getProducts(
    filter: FilterProduct,
    pagination: Pagination,
  ): Promise<ProductsResult> {
    return await this.productDatasource.getProducts(filter, pagination);
  }

  async getProductById(id: string): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }
  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    return await this.productDatasource.createProduct(product);
  }
  updateProduct(id: string, product: ProductEntity): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }
  deleteProduct(id: string): Promise<ProductEntity> {
    throw new Error('Method not implemented.');
  }
}
