import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any) {
    if (!isMongoId(value)) throw new BadRequestException('Invalid ID');
    return value;
  }
}
