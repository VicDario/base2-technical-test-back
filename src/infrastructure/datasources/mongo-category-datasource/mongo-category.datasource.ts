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

  async getCategories(pagination: Pagination): Promise<CategoriesResult> {
    const query = this.categoryModel.find();
    const totalCategories = query.clone().estimatedDocumentCount().exec();
    const categoriesResult = await query
      .limit(pagination.limit)
      .skip(pagination.offset)
      .exec();

    const categories = categoriesResult.map(CategoryEntity.fromObject);
    return {
      categories: categories,
      total: await totalCategories,
    };
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) return null;
    return CategoryEntity.fromObject(category);
  }

  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    const newCategory = await this.categoryModel.create(category);
    return CategoryEntity.fromObject(newCategory);
  }

  async createManyCategories(categories: CategoryEntity[]): Promise<CategoryEntity[]> {
    const newCategories = await this.categoryModel.insertMany(categories);
    return newCategories.map(CategoryEntity.fromObject);    
  }

  async updateCategory(
    id: string,
    category: CategoryEntity,
  ): Promise<CategoryEntity> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      category,
      { new: true },
    );
    if (!updatedCategory) return null;
    return CategoryEntity.fromObject(updatedCategory);
  }

  async deleteCategory(id: string): Promise<CategoryEntity> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) return null;
    return CategoryEntity.fromObject(deletedCategory);
  }
}
