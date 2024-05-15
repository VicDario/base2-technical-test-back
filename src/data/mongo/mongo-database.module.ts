import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ConfigType } from '@nestjs/config';
import { envs } from '@/config/env.config';
import { Product, ProductSchema } from './models/product.model';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [envs.KEY],
      useFactory: async (configService: ConfigType<typeof envs>) => {
        const { mongoUrl } = configService;
        return {
          uri: mongoUrl,
        };
      },
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongoDatabaseModule {}
