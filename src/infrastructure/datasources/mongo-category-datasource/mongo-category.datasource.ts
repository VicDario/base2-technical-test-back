import { Injectable } from '@nestjs/common';
import { CategoryDatasource } from '@/domain/datasources/category.datasource';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '@/data/mongo/models/category.model';
import {
  Pagination,
  CategoriesResult,
} from '@/domain/repositories/category.repository';
import { CategoryEntity } from '@/entities/category.entity';

@Injectable()
export class MongoCategoryDatasource implements CategoryDatasource {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  getCategories(pagination: Pagination): Promise<CategoriesResult> {
    throw new Error('Method not implemented.');
  }
  getCategoryById(id: string): Promise<CategoryEntity> {
    throw new Error('Method not implemented.');
  }
  createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    throw new Error('Method not implemented.');
  }
  updateCategory(
    id: string,
    category: CategoryEntity,
  ): Promise<CategoryEntity> {
    throw new Error('Method not implemented.');
  }
  deleteCategory(id: string): Promise<CategoryEntity> {
    throw new Error('Method not implemented.');
  }
}
