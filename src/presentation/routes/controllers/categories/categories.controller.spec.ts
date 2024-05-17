import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { mockCategoriesUseCases } from '@/infrastructure/mocks/use-cases/categories.use-cases.mock';
import { CategoriesUseCasesService } from '@/use-cases/categories-use-cases/categories.use-cases.service';
describe('CategoriesController', () => {
  let controller: CategoriesController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
