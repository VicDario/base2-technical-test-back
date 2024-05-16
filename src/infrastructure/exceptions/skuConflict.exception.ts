import { HttpException, HttpStatus } from '@nestjs/common';

export class SkuConflictException extends HttpException {
  constructor(sku: string) {
    super(`SKU '${sku}' already exists`, HttpStatus.CONFLICT);
  }
}
