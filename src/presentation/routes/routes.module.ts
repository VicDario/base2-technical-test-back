import { Module } from '@nestjs/common';
import { ProductsModule } from './controllers/products/products.module';

@Module({
  imports: [ProductsModule],
})
export class RoutesModule {}
