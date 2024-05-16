import { Module } from '@nestjs/common';
import { CategoriesModule } from './controllers/categories/categories.module';
import { ProductsModule } from './controllers/products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
})
export class RoutesModule {}
