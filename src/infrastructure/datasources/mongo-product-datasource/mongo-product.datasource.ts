import { Product } from '@/data/mongo/models/product.model';
import {
  FilterProduct,
  Pagination,
  ProductsResult,
} from '@/domain/repositories/product.repository';
import { ProductEntity } from '@/domain/entities/product.entity';
import { CategoryEntity } from '@/domain/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDatasource } from '@/domain/datasources/product.datasource';
import { SkuConflictException } from '@/infrastructure/exceptions/skuConflict.exception';

const invalidCategory = new CategoryEntity({ id: '', name: 'no-valid' });

@Injectable()
export class MongoProductDatasource implements ProductDatasource {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async getProducts(
    filter: FilterProduct = {},
    pagination: Pagination,
  ): Promise<ProductsResult> {
    const productFilter = {};
    if (filter.name)
      productFilter['name'] = { $regex: filter.name, $options: 'i' };
    if (filter.sku)
      productFilter['sku'] = { $regex: filter.sku, $options: 'i' };
    if (filter.minPrice) productFilter['price'] = { $gte: filter.minPrice };
    if (filter.maxPrice)
      productFilter['price'] = {
        ...productFilter['price'],
        $lte: filter.maxPrice,
      };

    const query = this.productModel
      .find(productFilter)
      .skip(pagination.offset)
      .limit(pagination.limit)
      .populate('category');
    const totalProducts = query.clone().estimatedDocumentCount().exec();
    const productsResult = await query.exec();
    const products = productsResult.map((product) => {
      if (!product.category)
        return ProductEntity.fromObject({
          ...product,
          category: invalidCategory,
        });
      return ProductEntity.fromObject(product);
    });
    return {
      products,
      total: await totalProducts,
    };
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productModel
      .findById(id)
      .populate('category')
      .exec();
    if (!product) return null;

    if (!product.category)
      return ProductEntity.fromObject({
        ...product,
        category: invalidCategory,
      });

    return ProductEntity.fromObject(product);
  }

  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    try {
      const newProduct = await this.productModel.create(product);
      await newProduct.populate('category');
      return ProductEntity.fromObject(newProduct);
    } catch (error) {
      if (error.code === 11000) throw new SkuConflictException(product.sku);
      else throw error;
    }
  }

  async createManyProducts(
    products: ProductEntity[],
  ): Promise<ProductEntity[]> {
    const newProducts = await this.productModel.insertMany(products);
    return newProducts.map(ProductEntity.fromObject);
  }

  async updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity> {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, product, { new: true })
        .populate('category')
        .exec();
      if (!updatedProduct) return null;
      return ProductEntity.fromObject(updatedProduct);
    } catch (error) {
      if (error.code === 11000) throw new SkuConflictException(product.sku);
      else throw error;
    }
  }

  async deleteProduct(id: string): Promise<ProductEntity> {
    const deletedProduct = await this.productModel
      .findByIdAndDelete(id)
      .populate('category')
      .exec();
    if (!deletedProduct) return null;
    if (!deletedProduct.category)
      return ProductEntity.fromObject({
        ...deletedProduct,
        category: invalidCategory,
      });
    return ProductEntity.fromObject(deletedProduct);
  }
}
