import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesUseCasesService } from './categories.use-cases.service';
import { mockCategoryRepository } from '@/infrastructure/mocks/repositories/category.repository.mock';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { CategoryRepositoryService } from '@/repositories/category-repository/category.repository.service';

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
});
