import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { UseCasesModule } from '@/infrastructure/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
