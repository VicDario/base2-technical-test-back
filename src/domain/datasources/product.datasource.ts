import { ProductEntity } from '../entities/product.entity';
import {
  FilterProduct,
  Pagination,
  ProductsResultPagination,
} from '../repositories/product.repository';

export abstract class ProductDatasource {
  abstract getProducts(
    filter: FilterProduct,
    pagination: Pagination,
  ): Promise<ProductsResultPagination>;
  abstract getProductById(id: string): Promise<ProductEntity>;
  abstract createProduct(product: ProductEntity): Promise<ProductEntity>;
  abstract updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: string): Promise<ProductEntity>;
}
