import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { UseCasesModule } from '@/use-cases/use-cases.module';
import { ProductsUseCasesService } from '@/use-cases/products-use-cases/products.use-cases.service';
import { mockProductsUseCases } from '@/infrastructure/mocks/use-cases/products.use-cases.mock';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsUseCasesService,
          useValue: mockProductsUseCases,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
