import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoriesUseCasesService } from '@/use-cases/categories-use-cases/categories.use-cases.service';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from '@/dtos/query.dto';
import { CreateCategoryDto } from '@/dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesUseCasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of categories' })
  async getCategories(@Query() pagination: PaginationDto) {
    return await this.categoriesService.getCategories(pagination);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async createCategory(@Body() payload: CreateCategoryDto) {
    return await this.categoriesService.createCategory(payload);
  }
}
