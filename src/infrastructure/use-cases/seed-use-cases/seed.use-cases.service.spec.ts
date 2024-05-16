import { Test, TestingModule } from '@nestjs/testing';
import { SeedUseCasesService } from './seed.use-cases.service';

describe('SeedUseCasesService', () => {
  let service: SeedUseCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedUseCasesService],
    }).compile();

    service = module.get<SeedUseCasesService>(SeedUseCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
