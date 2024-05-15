import { Module } from '@nestjs/common';
import { MongoProductDatasource } from './mongo-product-datasource/mongo-product.datasource';
import { MongoDatabaseModule } from '@/data/mongo/mongo-database.module';

@Module({
  imports: [MongoDatabaseModule],
  providers: [
    {
      provide: 'ProductDatasource',
      useClass: MongoProductDatasource,
    },
  ],
  exports: ['ProductDatasource'],
})
export class DatasourcesModule {}
