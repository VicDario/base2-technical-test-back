import { ProductDatasource } from '@/domain/datasources/product.datasource';

export const mockProductDatasource: ProductDatasource = {
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  createManyProducts: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
};
