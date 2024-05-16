import { Module } from '@nestjs/common';
import { CategoriesModule } from './controllers/categories/categories.module';
import { ProductsModule } from './controllers/products/products.module';
import { SeedModule } from './controllers/seed/seed.module';

@Module({
  imports: [CategoriesModule, ProductsModule, SeedModule],
})
export class RoutesModule {}
