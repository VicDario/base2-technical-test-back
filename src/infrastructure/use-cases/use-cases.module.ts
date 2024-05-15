import { Module } from '@nestjs/common';
import { ProductsUseCasesService } from './products-use-cases/products.use-cases.service';
import { RepositoriesModule } from '@/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [ProductsUseCasesService],
  exports: [ProductsUseCasesService],
})
export class UseCasesModule {}
