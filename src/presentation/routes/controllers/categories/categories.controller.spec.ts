import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { mockCategoriesUseCases } from '@/infrastructure/mocks/use-cases/categories.use-cases.mock';
import { CategoriesUseCasesService } from '@/use-cases/categories-use-cases/categories.use-cases.service';
import { PaginationDto } from '@/dtos/query.dto';
import { categoriesArray } from '@/infrastructure/mocks/data/category.mock';
import { CategoryEntity } from '@/entities/category.entity';
import { CreateCategoryDto } from '@/dtos/category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesUseCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesUseCasesService,
          useValue: mockCategoriesUseCases,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesUseCasesService>(CategoriesUseCasesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a list of categories', async () => {
    const paginationDto: PaginationDto = { limit: 10, offset: 0 };
    const mockedCategories = categoriesArray
      .filter((_, index) => index < paginationDto.limit)
      .map(CategoryEntity.fromObject);
    const mockedResult = {
      categories: mockedCategories,
      total: mockedCategories.length,
    };
    jest.spyOn(service, 'getCategories').mockResolvedValue(mockedResult);

    const result = await controller.getCategories(paginationDto);

    expect(result).toBe(mockedResult);
    expect(service.getCategories).toHaveBeenCalledWith(paginationDto);
  });

  it('should get a category by id', async () => {
    const id = '1';
    const mockedResult = CategoryEntity.fromObject(categoriesArray[0]);
    jest.spyOn(service, 'getCategoryById').mockResolvedValue(mockedResult);

    const result = await controller.getCategory(id);

    expect(result).toBe(mockedResult);
    expect(result).toBeInstanceOf(CategoryEntity);
    expect(service.getCategoryById).toHaveBeenCalledWith(id);
  });

  it('should create a new category', async () => {
    const createCategoryDto: CreateCategoryDto = { name: 'New Category' };
    const mockedResult = CategoryEntity.fromObject({
      ...createCategoryDto,
      id: '1',
    });
    jest.spyOn(service, 'createCategory').mockResolvedValue(mockedResult);

    const result = await controller.createCategory(createCategoryDto);

    expect(result).toBe(mockedResult);
    expect(service.createCategory).toHaveBeenCalledWith(createCategoryDto);
  });

  it('should delete a category', async () => {
    const id = '1';
    const mockedResult = CategoryEntity.fromObject(categoriesArray[0]);
    jest.spyOn(service, 'deleteCategory').mockResolvedValue(mockedResult);

    const result = await controller.deleteCategory(id);

    expect(result).toBe(mockedResult);
    expect(result).toBeInstanceOf(CategoryEntity);
    expect(service.deleteCategory).toHaveBeenCalledWith(id);
  });
});
