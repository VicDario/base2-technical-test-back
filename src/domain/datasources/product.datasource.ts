import { ProductEntity } from '../entities/product.entity';

export abstract class ProductDatasource {
  abstract getProducts(offset: number, limit: number): Promise<ProductEntity[]>;
  abstract getProductById(id: string): Promise<ProductEntity>;
  abstract createProduct(product: ProductEntity): Promise<ProductEntity>;
  abstract updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: string): Promise<ProductEntity>;
}
