import { Module } from '@nestjs/common';
import { MongoProductDatasource } from './mongo-product-datasource/mongo-product.datasource';
import { MongoDatabaseModule } from '@/data/mongo/mongo-database.module';
import { MongoCategoryDatasource } from './mongo-category-datasource/mongo-category.datasource';

@Module({
  imports: [MongoDatabaseModule],
  providers: [
    {
      provide: 'CategoryDatasource',
      useClass: MongoCategoryDatasource,
    },
    {
      provide: 'ProductDatasource',
      useClass: MongoProductDatasource,
    },
  ],
  exports: ['ProductDatasource', 'CategoryDatasource'],
})
export class DatasourcesModule {}
