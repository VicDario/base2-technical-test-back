import { ProductEntity } from '../entities/product.entity';
import { FilterProducts, Pagination } from '../datasources/product.datasource';

export abstract class ProductRepository {
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
