import { ProductRepository } from '@/domain/repositories/product.repository';

export const mockProductRepository: ProductRepository = {
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  createManyProducts: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
};
