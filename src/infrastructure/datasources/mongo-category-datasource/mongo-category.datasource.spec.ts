import { Test, TestingModule } from '@nestjs/testing';
import { MongoCategoryDatasource } from './mongo-category.datasource';
import { Model } from 'mongoose';
import { Category } from '@/data/mongo/models/category.model';
import {
  Pagination,
  CategoriesResult,
} from '@/domain/repositories/category.repository';
import { CategoryEntity } from '@/entities/category.entity';
import { getModelToken } from '@nestjs/mongoose';
import { categoriesArray } from '@/infrastructure/mocks/data/category.mock';

describe('MongoCategoryDatasource', () => {
  let datasource: MongoCategoryDatasource;
  let categoryModel: Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoCategoryDatasource,
        {
          provide: getModelToken(Category.name),
          useValue: Model,
        },
      ],
    }).compile();

    datasource = module.get<MongoCategoryDatasource>(MongoCategoryDatasource);
    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
  });

  it('should be defined', () => {
    expect(datasource).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return categories with data for pagination', async () => {
      jest.spyOn(categoryModel, 'find').mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(categoriesArray),
        clone: jest.fn().mockReturnThis(),
        estimatedDocumentCount: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(categoriesArray.length),
        }),
      } as any);
      const pagination: Pagination = {
        offset: 0,
        limit: categoriesArray.length,
      };
      const categoriesResult: CategoriesResult = {
        categories: categoriesArray.map(CategoryEntity.fromObject),
        total: categoriesArray.length,
      };

      const result = await datasource.getCategories(pagination);

      expect(result).toEqual(categoriesResult);
      result.categories.forEach((category: CategoryEntity) =>
        expect(category).toBeInstanceOf(CategoryEntity),
      );
    });
  });

  describe('getCategoryById', () => {
    it('should return a category if found', async () => {
      const category = categoriesArray[0];

      jest.spyOn(categoryModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(category),
      } as any);

      const result = await datasource.getCategoryById('1');

      expect(result).toEqual(CategoryEntity.fromObject(category));
    });

    it('should return null if category not found', async () => {
      jest.spyOn(categoryModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await datasource.getCategoryById('1');

      expect(result).toBeNull();
    });
  });

  describe('createCategory', () => {
    it('should create and return a new category', async () => {
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest.spyOn(categoryModel, 'create').mockResolvedValue(category as any);

      const result = await datasource.createCategory(category);

      expect(result).toEqual(CategoryEntity.fromObject(category));
    });
  });

  describe('createManyCategories', () => {
    it('should create and return an array of new categories', async () => {
      const categories = categoriesArray.map(CategoryEntity.fromObject);
      jest
        .spyOn(categoryModel, 'insertMany')
        .mockResolvedValue(categories as any);

      const result = await datasource.createManyCategories(categories);

      expect(result).toEqual(categories);
      categories.forEach((category) =>
        expect(category).toBeInstanceOf(CategoryEntity),
      );
    });
  });

  describe('updateCategory', () => {
    it('should delete and return the category', async () => {
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      category.name = 'New Name';
      jest.spyOn(categoryModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(category),
      } as any);

      const result = await datasource.updateCategory('1', category);

      expect(result).toEqual(category);
    });

    it('should return null if category not found', async () => {
      jest.spyOn(categoryModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await datasource.deleteCategory('1');

      expect(result).toBeNull();
    });
  });

  describe('deleteCategory', () => {
    it('should delete and return the category', async () => {
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest.spyOn(categoryModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(category),
      } as any);

      const result = await datasource.deleteCategory('1');

      expect(result).toEqual(category);
    });

    it('should return null if category not found', async () => {
      jest.spyOn(categoryModel, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await datasource.deleteCategory('1');

      expect(result).toBeNull();
    });
  });
});
