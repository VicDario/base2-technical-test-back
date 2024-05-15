import { Module } from '@nestjs/common';
import { ProductRepositoryService } from './product-repository/product.repository.service';
import { DatasourcesModule } from '../datasources/datasources.module';

@Module({
  imports: [DatasourcesModule],
  providers: [ProductRepositoryService],
  exports: [ProductRepositoryService],
})
export class RepositoriesModule {}
