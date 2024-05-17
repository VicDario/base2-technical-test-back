import { CategoryRepository } from '@/domain/repositories/category.repository';

export const mockCategoryRepository: CategoryRepository = {
  getCategories: jest.fn(),
  getCategoryById: jest.fn(),
  createCategory: jest.fn(),
  createManyCategories: jest.fn(),
  deleteCategory: jest.fn(),
};
