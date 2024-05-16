import { Injectable } from '@nestjs/common';
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

  async createCategory(category: CreateCategoryDto) {
    const newCategory = new CategoryEntity(category);
    return await this.categoryRepository.createCategory(newCategory);
  }
}
