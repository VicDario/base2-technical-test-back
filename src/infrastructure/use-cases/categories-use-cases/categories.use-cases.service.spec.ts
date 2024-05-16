import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesUseCasesService } from './categories.use-cases.service';

describe('CategoriesUseCasesService', () => {
  let service: CategoriesUseCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesUseCasesService],
    }).compile();

    service = module.get<CategoriesUseCasesService>(CategoriesUseCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
