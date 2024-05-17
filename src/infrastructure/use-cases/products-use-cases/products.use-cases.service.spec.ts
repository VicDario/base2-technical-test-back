import { Test, TestingModule } from '@nestjs/testing';
import { ProductsUseCasesService } from './products.use-cases.service';
import {
  Pagination,
  ProductRepository,
  ProductsResult,
} from '@/domain/repositories/product.repository';
import { mockProductRepository } from '@/infrastructure/mocks/repositories/product.repository.mock';
import { ProductRepositoryService } from '@/repositories/product-repository/product.repository.service';
import { ProductEntity } from '@/entities/product.entity';
import { productsArray } from '@/infrastructure/mocks/data/product.mock';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@/dtos/product.dto';

describe('ProductsUseCasesService', () => {
  let service: ProductsUseCasesService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsUseCasesService,
        { provide: ProductRepositoryService, useValue: mockProductRepository },
      ],
    }).compile();

    service = module.get<ProductsUseCasesService>(ProductsUseCasesService);
    productRepository = module.get<ProductRepository>(ProductRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return a list of products', async () => {
      const pagination: Pagination = { offset: 0, limit: 10 };
      const products = productsArray
        .filter((_, index) => index < pagination.limit)
        .map(ProductEntity.fromObject);
      const mockedResult: ProductsResult = {
        products,
        total: products.length,
      };
      jest
        .spyOn(productRepository, 'getProducts')
        .mockResolvedValue(mockedResult);

      const result = await service.getProducts(pagination, {});

      expect(result).toBeDefined();
      expect(result).toMatchObject(mockedResult);
      result.products.forEach((product) =>
        expect(product).toBeInstanceOf(ProductEntity),
      );
      expect(result.products).toHaveLength(products.length);
    });
  });

  describe('getProductById', () => {
    it('should return a product', async () => {
      const productId = '1';
      const product = ProductEntity.fromObject(productsArray[0]);
      jest
        .spyOn(productRepository, 'getProductById')
        .mockResolvedValue(product);

      const result = await service.getProductById(productId);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(ProductEntity);
    });
    it('should throw an error if the product does not exist', async () => {
      const productId = '1';
      jest.spyOn(productRepository, 'getProductById').mockResolvedValue(null);

      expect(service.getProductById(productId)).rejects.toThrow();
      expect(service.getProductById(productId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const productEntity = ProductEntity.fromObject(productsArray[0]);
      const productPayload: CreateProductDto = {
        ...productEntity,
        category: productEntity.category as string,
      };
      jest
        .spyOn(productRepository, 'createProduct')
        .mockResolvedValue(productEntity);

      const result = await service.createProduct(productPayload);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(ProductEntity);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const productId = '1';
      const productEntity = ProductEntity.fromObject(productsArray[0]);
      const productPayload: UpdateProductDto = {
        name: 'New Name',
      };
      jest
        .spyOn(productRepository, 'updateProduct')
        .mockResolvedValue(productEntity);

      const result = await service.updateProduct(productId, productPayload);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(ProductEntity);
    });
    it('should throw an error if the product does not exist', async () => {
      const productId = '1';
      const productEntity = ProductEntity.fromObject(productsArray[0]);
      const productPayload: UpdateProductDto = {
        ...productEntity,
        category: productEntity.category as string,
      };
      jest.spyOn(productRepository, 'updateProduct').mockResolvedValue(null);

      expect(
        service.updateProduct(productId, productPayload),
      ).rejects.toThrow();
      expect(
        service.updateProduct(productId, productPayload),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const productId = '1';
      const product = ProductEntity.fromObject(productsArray[0]);
      jest.spyOn(productRepository, 'deleteProduct').mockResolvedValue(product);

      const result = await service.deleteProduct(productId);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(ProductEntity);
    });
    it('should throw an error if the product does not exist', async () => {
      const productId = '1';
      jest.spyOn(productRepository, 'deleteProduct').mockResolvedValue(null);

      expect(service.deleteProduct(productId)).rejects.toThrow();
      expect(service.deleteProduct(productId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
