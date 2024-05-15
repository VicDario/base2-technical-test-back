import { Test, TestingModule } from '@nestjs/testing';
import { ProductsUseCasesService } from './products.use-cases.service';

describe('ProductsUseCasesService', () => {
  let service: ProductsUseCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsUseCasesService],
    }).compile();

    service = module.get<ProductsUseCasesService>(ProductsUseCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
