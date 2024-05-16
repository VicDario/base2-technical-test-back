import { Module } from '@nestjs/common';
import { DatasourcesModule } from '../datasources/datasources.module';
import { CategoryRepositoryService } from './category-repository/category.repository.service';
import { ProductRepositoryService } from './product-repository/product.repository.service';

@Module({
  imports: [DatasourcesModule],
  providers: [CategoryRepositoryService, ProductRepositoryService],
  exports: [CategoryRepositoryService, ProductRepositoryService],
})
export class RepositoriesModule {}
