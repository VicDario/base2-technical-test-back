import { CategoryEntity } from '@/entities/category.entity';
import { ProductEntity } from '@/entities/product.entity';
import { CategoryRepositoryService } from '@/repositories/category-repository/category.repository.service';
import { ProductRepositoryService } from '@/repositories/product-repository/product.repository.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SeedUseCasesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly productRepository: ProductRepositoryService,
    private readonly categoryRepository: CategoryRepositoryService,
  ) {}

  async seed() {
    const apiUrl = this.configService.getOrThrow('config.apiSeedUrl');

    const categoriesResponse = await firstValueFrom(
      this.httpService.get(`${apiUrl}/products/categories`),
    );
    const newCategory = categoriesResponse.data.map(
      (category: string) => new CategoryEntity({ name: category }),
    );
    const categories =
      await this.categoryRepository.createManyCategories(newCategory);

    const productsResponse = await firstValueFrom(
      this.httpService.get(`${apiUrl}/products?limit=300`),
    );
    const products = productsResponse.data.products.map((product) => {
      const category = categories.find(
        (category) => category.name === product.category,
      );
      return ProductEntity.fromObject({
        ...product,
        category: category.id,
        name: product.title,
        sku: `${product.title.replace(/ /g, '-').toLowerCase()}-${product.id}`,
      });
    });
    await this.productRepository.createManyProducts(products);
  }
}
