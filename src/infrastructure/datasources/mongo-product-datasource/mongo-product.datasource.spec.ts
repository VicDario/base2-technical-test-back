import { Test, TestingModule } from '@nestjs/testing';
import { MongoProductDatasource } from './mongo-product.datasource';
import { Model } from 'mongoose';
import { Product } from '@/data/mongo/models/product.model';
import { getModelToken } from '@nestjs/mongoose';
import { ProductEntity } from '@/entities/product.entity';
import {
  Pagination,
  ProductsResult,
} from '@/domain/repositories/product.repository';
import { productsArray } from '@/infrastructure/mocks/data/product.mock';

describe('MongoProductDatasource', () => {
  let datasource: MongoProductDatasource;
  let productModel: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoProductDatasource,
        {
          provide: getModelToken(Product.name),
          useValue: Model,
        },
      ],
    }).compile();

    datasource = module.get<MongoProductDatasource>(MongoProductDatasource);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(datasource).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return products with data for pagination', async () => {
      jest.spyOn(productModel, 'find').mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(productsArray),
        clone: jest.fn().mockReturnThis(),
        estimatedDocumentCount: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(productsArray.length),
        }),
      } as any);
      const pagination: Pagination = {
        offset: 0,
        limit: productsArray.length,
      };
      const productsResult: ProductsResult = {
        products: productsArray.map(ProductEntity.fromObject),
        total: productsArray.length,
      };

      const result = await datasource.getProducts({}, pagination);

      expect(result).toEqual(productsResult);
      result.products.forEach((product: ProductEntity) =>
        expect(product).toBeInstanceOf(ProductEntity),
      );
    });
  });

  describe('getProductById', () => {
    it('should return a product if found', async () => {
      const product = productsArray[0];

      jest.spyOn(productModel, 'findById').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(product),
      } as any);

      const result = await datasource.getProductById('1');

      expect(result).toEqual(ProductEntity.fromObject(product));
    });

    it('should return null if product not found', async () => {
      jest.spyOn(productModel, 'findById').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await datasource.getProductById('1');

      expect(result).toBeNull();
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);
      jest.spyOn(productModel, 'create').mockResolvedValue({
        ...product,
        populate: jest.fn().mockResolvedValue(true),
      } as any);

      const result = await datasource.createProduct(product);

      expect(result).toEqual(ProductEntity.fromObject(product));
    });
  });

  describe('createManyProducts', () => {
    it('should create and return an array of new products', async () => {
      const products = productsArray.map(ProductEntity.fromObject);
      jest.spyOn(productModel, 'insertMany').mockResolvedValue(products as any);

      const result = await datasource.createManyProducts(products);

      expect(result).toEqual(products);
      products.forEach((product) =>
        expect(product).toBeInstanceOf(ProductEntity),
      );
    });
  });

  describe('updateProduct', () => {
    it('should delete and return the product', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);
      product.name = 'New Name';
      jest.spyOn(productModel, 'findByIdAndUpdate').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(product),
      } as any);

      const result = await datasource.updateProduct('1', product);

      expect(result).toEqual(product);
    });

    it('should return null if product not found', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);
      product.name = 'New Name';
      jest.spyOn(productModel, 'findByIdAndUpdate').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await datasource.updateProduct('1', product);

      expect(result).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should delete and return the product', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);
      jest.spyOn(productModel, 'findByIdAndDelete').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(product),
      } as any);

      const result = await datasource.deleteProduct('1');

      expect(result).toEqual(product);
    });

    it('should return null if product not found', async () => {
      jest.spyOn(productModel, 'findByIdAndDelete').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await datasource.deleteProduct('1');

      expect(result).toBeNull();
    });
  });
});
