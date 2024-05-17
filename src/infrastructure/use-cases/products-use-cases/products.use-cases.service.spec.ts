import { Test, TestingModule } from '@nestjs/testing';
import { ProductsUseCasesService } from './products.use-cases.service';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { mockProductRepository } from '@/infrastructure/mocks/repositories/product.repository.mock';
import { ProductRepositoryService } from '@/repositories/product-repository/product.repository.service';

describe('ProductsUseCasesService', () => {
  let service: ProductsUseCasesService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsUseCasesService,
        { provide: ProductRepositoryService, useValue: mockProductRepository },
      ],
    }).compile();

    service = module.get<ProductsUseCasesService>(ProductsUseCasesService);
    productRepository = module.get<ProductRepository>(ProductRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
