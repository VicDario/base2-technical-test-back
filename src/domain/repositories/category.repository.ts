import { CategoryEntity } from '../entities/category.entity';

export interface CategoriesResult {
  total: number;
  categories: CategoryEntity[];
}

export interface Pagination {
  offset: number;
  limit: number;
}

export abstract class CategoryRepository {
  abstract getCategories(pagination: Pagination): Promise<CategoriesResult>;
  abstract getCategoryById(id: string): Promise<CategoryEntity>;
  abstract createCategory(category: CategoryEntity): Promise<CategoryEntity>;
  abstract createManyCategories(products: CategoryEntity[]): Promise<CategoryEntity[]>;
  abstract deleteCategory(id: string): Promise<CategoryEntity>;
}
