import { HttpException } from '@nestjs/common';
import { MongoIdPipe } from './mongo-id.pipe';
import { mongo } from 'mongoose';
describe('MongoIdPipe', () => {
  it('should be defined', () => {
    expect(new MongoIdPipe()).toBeDefined();
  });

  it('should transform a valid id', () => {
    const mongoId = new mongo.ObjectId().toString();
    const pipe = new MongoIdPipe();

    const result = pipe.transform(mongoId);

    expect(result).toEqual(mongoId);
  });

  it('should return exception when invalid mongo id', () => {
    const mongoId = 'fkuhas';
    const pipe = new MongoIdPipe();

    try {
      pipe.transform(mongoId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
