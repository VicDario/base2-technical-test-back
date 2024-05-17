import { Test, TestingModule } from '@nestjs/testing';
import { SeedUseCasesService } from './seed.use-cases.service';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { mockCategoryRepository } from '@/infrastructure/mocks/repositories/category.repository.mock';
import { mockProductRepository } from '@/infrastructure/mocks/repositories/product.repository.mock';
import { CategoryRepositoryService } from '@/repositories/category-repository/category.repository.service';
import { ProductRepositoryService } from '@/repositories/product-repository/product.repository.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('SeedUseCasesService', () => {
  let service: SeedUseCasesService;
  let categoryRepository: CategoryRepository;
  let productRepository: ProductRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedUseCasesService,
        {
          provide: CategoryRepositoryService,
          useValue: mockCategoryRepository,
        },
        { provide: ProductRepositoryService, useValue: mockProductRepository },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SeedUseCasesService>(SeedUseCasesService);
    categoryRepository = module.get<CategoryRepository>(
      CategoryRepositoryService,
    );
    productRepository = module.get<ProductRepository>(ProductRepositoryService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
