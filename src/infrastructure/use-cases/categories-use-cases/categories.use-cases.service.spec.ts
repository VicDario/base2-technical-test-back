import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesUseCasesService } from './categories.use-cases.service';
import { mockCategoryRepository } from '@/infrastructure/mocks/repositories/category.repository.mock';
import {
  CategoriesResult,
  CategoryRepository,
  Pagination,
} from '@/domain/repositories/category.repository';
import { CategoryRepositoryService } from '@/repositories/category-repository/category.repository.service';
import { categoriesArray } from '@/infrastructure/mocks/data/category.mock';
import { CategoryEntity } from '@/entities/category.entity';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesUseCasesService', () => {
  let service: CategoriesUseCasesService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesUseCasesService,
        {
          provide: CategoryRepositoryService,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesUseCasesService>(CategoriesUseCasesService);
    categoryRepository = module.get<CategoryRepository>(
      CategoryRepositoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return a list of categories', async () => {
      const pagination: Pagination = { offset: 0, limit: 10 };
      const mockedResult: CategoriesResult = {
        categories: categoriesArray
          .filter((_, index) => index < pagination.limit)
          .map(CategoryEntity.fromObject),
        total: categoriesArray.length,
      };
      jest
        .spyOn(categoryRepository, 'getCategories')
        .mockResolvedValue(mockedResult);

      const result = await service.getCategories(pagination);

      expect(result).toBeDefined();
      expect(result).toMatchObject(mockedResult);
      result.categories.forEach((category) =>
        expect(category).toBeInstanceOf(CategoryEntity),
      );
      expect(result.categories).toHaveLength(categoriesArray.length);
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by id', async () => {
      const id = '1';
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest
        .spyOn(categoryRepository, 'getCategoryById')
        .mockResolvedValue(category);

      const result = await service.getCategoryById(id);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(CategoryEntity);
    });
    it('should throw an error if category is not found', async () => {
      const id = 'invalid-id';
      jest.spyOn(categoryRepository, 'getCategoryById').mockResolvedValue(null);

      await expect(service.getCategoryById(id)).rejects.toThrow();
      await expect(service.getCategoryById(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('createCategory', () => {
    it('should create a category', async () => {
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest
        .spyOn(categoryRepository, 'createCategory')
        .mockResolvedValue(category);

      const result = await service.createCategory(category);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(CategoryEntity);
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const id = '1';
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest
        .spyOn(categoryRepository, 'deleteCategory')
        .mockResolvedValue(category);

      const result = await service.deleteCategory(id);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(CategoryEntity);
    });
    it('should throw an error if category is not found', async () => {
      const id = 'invalid-id';
      jest.spyOn(categoryRepository, 'deleteCategory').mockResolvedValue(null);

      await expect(service.deleteCategory(id)).rejects.toThrow();
      await expect(service.deleteCategory(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
