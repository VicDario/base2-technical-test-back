import { CategoryDatasource } from '@/domain/datasources/category.datasource';
import {
  CategoriesResult,
  CategoryRepository,
  Pagination,
} from '@/domain/repositories/category.repository';
import { CategoryEntity } from '@/entities/category.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepositoryService implements CategoryRepository {
  constructor(
    @Inject('CategoryDatasource')
    private categoryDatasource: CategoryDatasource,
  ) {}

  async getCategories(pagination: Pagination): Promise<CategoriesResult> {
    return await this.categoryDatasource.getCategories(pagination);
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    return await this.categoryDatasource.getCategoryById(id);
  }

  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    return await this.categoryDatasource.createCategory(category);
  }

  async createManyCategories(categories: CategoryEntity[]): Promise<CategoryEntity[]> {
    return await this.categoryDatasource.createManyCategories(categories);
  }

  async deleteCategory(id: string): Promise<CategoryEntity> {
    return await this.categoryDatasource.deleteCategory(id);
  }
}
