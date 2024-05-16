import { Injectable, NotFoundException } from '@nestjs/common';
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
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new NotFoundException();
    return product;
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = ProductEntity.fromObject(product);
    return await this.productRepository.createProduct(newProduct);
  }

  async updateProduct(id: string, payload: UpdateProductDto) {
    const product = ProductEntity.fromPartial(payload);
    const updatedProduct = await this.productRepository.updateProduct(
      id,
      product,
    );
    if (!updatedProduct) throw new NotFoundException();
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const deletedProduct = await this.productRepository.deleteProduct(id);
    if (!deletedProduct) throw new NotFoundException();
    return deletedProduct;
  }
}
