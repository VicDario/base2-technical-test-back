import { Module } from '@nestjs/common';
import { ProductsUseCasesService } from './products-use-cases/products.use-cases.service';
import { RepositoriesModule } from '@/repositories/repositories.module';
import { CategoriesUseCasesService } from './categories-use-cases/categories.use-cases.service';
import { SeedUseCasesService } from './seed-use-cases/seed.use-cases.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RepositoriesModule, HttpModule],
  providers: [
    CategoriesUseCasesService,
    ProductsUseCasesService,
    SeedUseCasesService,
  ],
  exports: [
    CategoriesUseCasesService,
    ProductsUseCasesService,
    SeedUseCasesService,
  ],
})
export class UseCasesModule {}
