import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepositoryService } from '@/repositories/category-repository/category.repository.service';
import { Pagination } from '@/domain/repositories/category.repository';
import { CreateCategoryDto } from '@/dtos/category.dto';
import { CategoryEntity } from '@/entities/category.entity';

@Injectable()
export class CategoriesUseCasesService {
  constructor(private readonly categoryRepository: CategoryRepositoryService) {}

  async getCategories(pagination: Pagination) {
    return await this.categoryRepository.getCategories(pagination);
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.getCategoryById(id);
    if (!category) throw new NotFoundException();
    return category
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = new CategoryEntity(category);
    return await this.categoryRepository.createCategory(newCategory);
  }

  async deleteCategory(id: string) {
    const deletedCategory = await this.categoryRepository.deleteCategory(id);
    if (!deletedCategory) throw new NotFoundException();
    return deletedCategory;
  }
}
