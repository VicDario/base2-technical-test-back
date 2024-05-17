import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedUseCasesService } from '@/use-cases/seed-use-cases/seed.use-cases.service';
import { mockSeedUseCases } from '@/infrastructure/mocks/use-cases/seed.use-cases.mock';

describe('SeedController', () => {
  let controller: SeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [
        {
          provide: SeedUseCasesService,
          useValue: mockSeedUseCases,
        },
      ],
    }).compile();

    controller = module.get<SeedController>(SeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
