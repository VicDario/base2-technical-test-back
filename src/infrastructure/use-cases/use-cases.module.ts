import { Module } from '@nestjs/common';
import { ProductsUseCasesService } from './products-use-cases/products.use-cases.service';
import { RepositoriesModule } from '@/repositories/repositories.module';
import { CategoriesUseCasesService } from './categories-use-cases/categories.use-cases.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RepositoriesModule, HttpModule],
  providers: [CategoriesUseCasesService, ProductsUseCasesService],
  exports: [CategoriesUseCasesService, ProductsUseCasesService],
})
export class UseCasesModule {}
