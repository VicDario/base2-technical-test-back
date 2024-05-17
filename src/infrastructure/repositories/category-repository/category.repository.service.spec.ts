import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepositoryService } from './category.repository.service';
import { CategoryDatasource } from '@/domain/datasources/category.datasource';
import { CategoryEntity } from '@/entities/category.entity';
import {
  CategoriesResult,
  Pagination,
} from '@/domain/repositories/category.repository';

describe('CategoryRepositoryService', () => {
  let repository: CategoryRepositoryService;
  let datasource: CategoryDatasource;

  const mockCategoryDatasource: CategoryDatasource = {
    getCategories: jest.fn(),
    getCategoryById: jest.fn(),
    createCategory: jest.fn(),
    createManyCategories: jest.fn(),
    deleteCategory: jest.fn(),
    updateCategory: jest.fn(),
  };

  const categoriesArray = [
    {
      id: '1',
      name: 'Clothes',
    },
    {
      id: '2',
      name: 'Fruits',
    },
    {
      id: '3',
      name: 'VideoGames',
    },
    {
      id: '4',
      name: 'Shoes',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryRepositoryService,
        {
          provide: 'CategoryDatasource',
          useValue: mockCategoryDatasource,
        },
      ],
    }).compile();

    repository = module.get<CategoryRepositoryService>(
      CategoryRepositoryService,
    );
    datasource = module.get<CategoryDatasource>('CategoryDatasource');
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return categories and total count', async () => {
      const pagination: Pagination = {
        limit: categoriesArray.length,
        offset: 0,
      };
      const categoriesResult: CategoriesResult = {
        categories: categoriesArray.map(CategoryEntity.fromObject),
        total: categoriesArray.length,
      };
      jest
        .spyOn(datasource, 'getCategories')
        .mockResolvedValue(categoriesResult);

      const result = await repository.getCategories(pagination);

      expect(result).toEqual(categoriesResult);
      expect(datasource.getCategories).toHaveBeenCalledWith(pagination);
    });
  });

  describe('getCategoryById', () => {
    it('should return a category if found', async () => {
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest.spyOn(datasource, 'getCategoryById').mockResolvedValue(category);

      const result = await repository.getCategoryById('1');

      expect(result).toEqual(category);
      expect(datasource.getCategoryById).toHaveBeenCalledWith('1');
    });

    it('should return null if category not found', async () => {
      jest.spyOn(datasource, 'getCategoryById').mockResolvedValue(null);

      const result = await repository.getCategoryById('1');
      expect(result).toBeNull();
      expect(datasource.getCategoryById).toHaveBeenCalledWith('1');
    });
  });

  describe('createCategory', () => {
    it('should create and return a new category', async () => {
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest.spyOn(datasource, 'createCategory').mockResolvedValue(category);

      const result = await repository.createCategory(category);

      expect(result).toEqual(category);
      expect(datasource.createCategory).toHaveBeenCalledWith(category);
    });
  });

  describe('createManyCategories', () => {
    it('should create and return an array of new categories', async () => {
      const categories = categoriesArray.map(CategoryEntity.fromObject);
      jest
        .spyOn(datasource, 'createManyCategories')
        .mockResolvedValue(categories);

      const result = await repository.createManyCategories(categories);
      expect(result).toEqual(categories);
      expect(datasource.createManyCategories).toHaveBeenCalledWith(categories);
    });
  });

  describe('deleteCategory', () => {
    it('should delete and return the category', async () => {
      const category = CategoryEntity.fromObject(categoriesArray[0]);
      jest.spyOn(datasource, 'deleteCategory').mockResolvedValue(category);

      const result = await repository.deleteCategory('1');

      expect(result).toEqual(category);
      expect(datasource.deleteCategory).toHaveBeenCalledWith('1');
    });

    it('should return null if category not found', async () => {
      jest.spyOn(datasource, 'deleteCategory').mockResolvedValue(null);

      const result = await repository.deleteCategory('1');

      expect(result).toBeNull();
      expect(datasource.deleteCategory).toHaveBeenCalledWith('1');
    });
  });
});
