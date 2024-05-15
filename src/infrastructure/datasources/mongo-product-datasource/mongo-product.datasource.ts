import { Product } from '@/data/mongo/models/product.model';
import {
  FilterProduct,
  Pagination,
  ProductDatasource,
} from '@/domain/datasources/product.datasource';
import { ProductEntity } from '@/domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoProductDatasource implements ProductDatasource {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getProducts(
    filter: FilterProduct = {},
    pagination: Pagination,
  ): Promise<ProductEntity[]> {
    const products = await this.productModel
      .find(filter)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .exec();
    return products.map(ProductEntity.fromObject);
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productModel.findById(id).exec();
    return ProductEntity.fromObject(product.toObject());
  }
  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    const newProduct = await this.productModel.create(product);
    return ProductEntity.fromObject(newProduct.toObject());
  }

  async updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ id }, product, { new: true })
      .exec();
    return ProductEntity.fromObject(updatedProduct.toObject());
  }

  async deleteProduct(id: string): Promise<ProductEntity> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    return ProductEntity.fromObject(deletedProduct.toObject());
  }
}
