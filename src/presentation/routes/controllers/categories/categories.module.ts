import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { UseCasesModule } from '@/infrastructure/use-cases/use-cases.module';

@Module({
  imports: [UseCasesModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
