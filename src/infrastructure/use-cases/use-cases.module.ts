import { Module } from '@nestjs/common';
import { ProductsUseCasesService } from './products-use-cases/products.use-cases.service';
import { RepositoriesModule } from '@/repositories/repositories.module';
import { CategoriesUseCasesService } from './categories-use-cases/categories.use-cases.service';

@Module({
  imports: [RepositoriesModule],
  providers: [CategoriesUseCasesService, ProductsUseCasesService],
  exports: [CategoriesUseCasesService, ProductsUseCasesService],
})
export class UseCasesModule {}
