import { CategoryEntity } from '../entities/category.entity';
import {
  Pagination,
  CategoriesResult,
} from '../repositories/category.repository';

export abstract class CategoryDatasource {
  abstract getCategories(pagination: Pagination): Promise<CategoriesResult>;
  abstract getCategoryById(id: string): Promise<CategoryEntity>;
  abstract createCategory(category: CategoryEntity): Promise<CategoryEntity>;
  abstract updateCategory(
    id: string,
    category: CategoryEntity,
  ): Promise<CategoryEntity>;
  abstract deleteCategory(id: string): Promise<CategoryEntity>;
}
