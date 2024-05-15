import { Test, TestingModule } from '@nestjs/testing';
import { MongoProductDatasource } from './mongo-product.datasource';

describe('MongoProductDatasource', () => {
  let service: MongoProductDatasource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoProductDatasource],
    }).compile();

    service = module.get<MongoProductDatasource>(MongoProductDatasource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
