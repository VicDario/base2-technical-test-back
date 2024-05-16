import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CategoriesUseCasesService } from '@/use-cases/categories-use-cases/categories.use-cases.service';
import { ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from '@/dtos/query.dto';
import { CreateCategoryDto } from '@/dtos/category.dto';
import { MongoIdPipe } from '@/infrastructure/pipes/mongo-id/mongo-id.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesUseCasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of categories' })
  async getCategories(@Query() pagination: PaginationDto) {
    return await this.categoriesService.getCategories(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category' })
  async getCategory(@Query('id', MongoIdPipe) id: string) {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  async createCategory(@Body() payload: CreateCategoryDto) {
    return await this.categoriesService.createCategory(payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  async deleteCategory(@Query('id', MongoIdPipe) id: string) {
    return await this.categoriesService.deleteCategory(id);
  }
}
