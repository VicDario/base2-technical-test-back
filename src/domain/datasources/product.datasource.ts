import { ProductEntity } from '../entities/product.entity';
import {
  FilterProduct,
  Pagination,
  ProductsResult,
} from '../repositories/product.repository';

export abstract class ProductDatasource {
  abstract getProducts(
    filter: FilterProduct,
    pagination: Pagination,
  ): Promise<ProductsResult>;
  abstract getProductById(id: string): Promise<ProductEntity>;
  abstract createProduct(product: ProductEntity): Promise<ProductEntity>;
  abstract createManyProducts(
    products: ProductEntity[],
  ): Promise<ProductEntity[]>;
  abstract updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: string): Promise<ProductEntity>;
}
