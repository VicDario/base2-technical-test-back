import { CategoryDatasource } from '@/domain/datasources/category.datasource';

export const mockCategoryDatasource: CategoryDatasource = {
  getCategories: jest.fn(),
  getCategoryById: jest.fn(),
  createCategory: jest.fn(),
  createManyCategories: jest.fn(),
  deleteCategory: jest.fn(),
  updateCategory: jest.fn(),
};
