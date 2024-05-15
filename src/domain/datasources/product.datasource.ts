import { ProductEntity } from '../entities/product.entity';

export interface Pagination {
  offset: number;
  limit: number;
}

export interface FilterProducts {
  name?: string;
  sku?: string;
  maxPrice?: number;
  minPrice?: number;
}

export abstract class ProductDatasource {
  abstract getProducts(
    filter: FilterProducts,
    pagination: Pagination,
  ): Promise<ProductEntity[]>;
  abstract getProductById(id: string): Promise<ProductEntity>;
  abstract createProduct(product: ProductEntity): Promise<ProductEntity>;
  abstract updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: string): Promise<ProductEntity>;
}
