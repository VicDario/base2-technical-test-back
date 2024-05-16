import { Test, TestingModule } from '@nestjs/testing';
import { MongoCategoryDatasource } from './mongo-category.datasource';

describe('MongoCategoryDatasource', () => {
  let service: MongoCategoryDatasource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoCategoryDatasource],
    }).compile();

    service = module.get<MongoCategoryDatasource>(MongoCategoryDatasource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
