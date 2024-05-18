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
import { CategoryRepositoryService } from '@/repositories/category-repository/category.repository.service';

@Injectable()
export class ProductsUseCasesService {
  constructor(
    private productRepository: ProductRepositoryService,
    private categoryRepository: CategoryRepositoryService,
  ) {}

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
    const category = await this.categoryRepository.getCategoryById(
      product.category,
    );
    if (!category)
      throw new NotFoundException({ message: 'Category not found' });
    const newProduct = ProductEntity.fromObject(product);
    return await this.productRepository.createProduct(newProduct);
  }

  async updateProduct(id: string, payload: UpdateProductDto) {
    if (payload.category) {
      const category = await this.categoryRepository.getCategoryById(
        payload.category,
      );
      if (!category)
        throw new NotFoundException({ message: 'Category not found' });
    }
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
