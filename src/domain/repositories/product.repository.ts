import { ProductEntity } from '../entities/product.entity';

export interface Pagination {
  offset: number;
  limit: number;
}

export interface FilterProduct {
  name?: string;
  sku?: string;
  maxPrice?: number;
  minPrice?: number;
}

export interface ProductsResult {
  total: number;
  products: ProductEntity[];
}

export abstract class ProductRepository {
  abstract getProducts(
    filter: FilterProduct,
    pagination: Pagination,
  ): Promise<ProductsResult>;
  abstract getProductById(id: string): Promise<ProductEntity>;
  abstract createProduct(product: ProductEntity): Promise<ProductEntity>;
  abstract createManyProducts(products: ProductEntity[]): Promise<ProductEntity[]>;
  abstract updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: string): Promise<ProductEntity>;
}
