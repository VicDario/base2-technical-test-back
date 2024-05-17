import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepositoryService } from './product.repository.service';
import { ProductDatasource } from '@/domain/datasources/product.datasource';
import { Pagination } from '@/domain/repositories/product.repository';
import {
  FilterProduct,
  ProductsResult,
} from '@/domain/repositories/product.repository';
import { ProductEntity } from '@/entities/product.entity';
import { mockProductDatasource } from '@/infrastructure/mocks/datasources/product.datasource.mock';
import { productsArray } from '@/infrastructure/mocks/data/product.mock';

describe('ProductRepositoryService', () => {
  let repository: ProductRepositoryService;
  let datasource: ProductDatasource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepositoryService,
        { provide: 'ProductDatasource', useValue: mockProductDatasource },
      ],
    }).compile();

    repository = module.get<ProductRepositoryService>(ProductRepositoryService);
    datasource = module.get<ProductDatasource>('ProductDatasource');
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return products and total count', async () => {
      const filter: FilterProduct = { minPrice: 10, maxPrice: 100 };
      const pagination: Pagination = { limit: 10, offset: 0 };
      const productsResult: ProductsResult = {
        products: productsArray.map(ProductEntity.fromObject),
        total: productsArray.length,
      };
      jest.spyOn(datasource, 'getProducts').mockResolvedValue(productsResult);

      const result = await repository.getProducts(filter, pagination);

      expect(result).toEqual(productsResult);
      result.products.forEach((product) =>
        expect(product).toBeInstanceOf(ProductEntity),
      );
      expect(datasource.getProducts).toHaveBeenCalledWith(filter, pagination);
    });
  });

  describe('getProductById', () => {
    it('should return a product if found', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);
      jest.spyOn(datasource, 'getProductById').mockResolvedValue(product);

      const result = await repository.getProductById('1');

      expect(result).toEqual(product);
      expect(result).toBeInstanceOf(ProductEntity);
      expect(datasource.getProductById).toHaveBeenCalledWith('1');
    });

    it('should return null if product not found', async () => {
      jest.spyOn(datasource, 'getProductById').mockResolvedValue(null);

      const result = await repository.getProductById('1');

      expect(result).toBeNull();
      expect(datasource.getProductById).toHaveBeenCalledWith('1');
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);
      jest.spyOn(datasource, 'createProduct').mockResolvedValue(product);

      const result = await repository.createProduct(product);

      expect(result).toEqual(product);
      expect(result).toBeInstanceOf(ProductEntity);
      expect(datasource.createProduct).toHaveBeenCalledWith(product);
    });
  });

  describe('createManyProducts', () => {
    it('should create and return an array of new products', async () => {
      const products = productsArray.map(ProductEntity.fromObject);
      jest.spyOn(datasource, 'createManyProducts').mockResolvedValue(products);

      const result = await repository.createManyProducts(products);

      expect(result).toEqual(products);
      result.forEach((product) =>
        expect(product).toBeInstanceOf(ProductEntity),
      );
      expect(datasource.createManyProducts).toHaveBeenCalledWith(products);
    });
  });

  describe('updateProduct', () => {
    it('should update and return the product', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);
      product.name = 'New name';
      jest.spyOn(datasource, 'updateProduct').mockResolvedValue(product);

      const result = await repository.updateProduct('1', product);

      expect(result).toEqual(product);
      expect(datasource.updateProduct).toHaveBeenCalledWith('1', product);
    });

    it('should return null if product not found', async () => {
      jest.spyOn(datasource, 'updateProduct').mockResolvedValue(null);

      const result = await repository.updateProduct(
        '1',
        ProductEntity.fromObject(productsArray[0]),
      );

      expect(result).toBeNull();
      expect(datasource.updateProduct).toHaveBeenCalledWith(
        '1',
        expect.any(ProductEntity),
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete and return the product', async () => {
      const product = ProductEntity.fromObject(productsArray[0]);

      jest.spyOn(datasource, 'deleteProduct').mockResolvedValue(product);

      const result = await repository.deleteProduct('1');
      expect(result).toEqual(product);
      expect(datasource.deleteProduct).toHaveBeenCalledWith('1');
    });

    it('should return null if product not found', async () => {
      jest.spyOn(datasource, 'deleteProduct').mockResolvedValue(null);

      const result = await repository.deleteProduct('1');

      expect(result).toBeNull();
      expect(datasource.deleteProduct).toHaveBeenCalledWith('1');
    });
  });
});
