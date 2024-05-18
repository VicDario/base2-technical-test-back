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
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { CategoryRepositoryService } from '@/repositories/category-repository/category.repository.service';
import { mockCategoryRepository } from '@/infrastructure/mocks/repositories/category.repository.mock';
import { CategoryEntity } from '@/entities/category.entity';

describe('ProductsUseCasesService', () => {
  let service: ProductsUseCasesService;
  let productRepository: ProductRepository;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsUseCasesService,
        { provide: ProductRepositoryService, useValue: mockProductRepository },
        {
          provide: CategoryRepositoryService,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsUseCasesService>(ProductsUseCasesService);
    productRepository = module.get<ProductRepository>(ProductRepositoryService);
    categoryRepository = module.get<CategoryRepository>(
      CategoryRepositoryService,
    );
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
      jest
        .spyOn(categoryRepository, 'getCategoryById')
        .mockResolvedValue(
          CategoryEntity.fromObject({
            id: productEntity.category,
            name: 'category',
          }),
        );

      const result = await service.createProduct(productPayload);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(ProductEntity);
    });
    it('should throw an error if the category does not exist', async () => {
      const productEntity = ProductEntity.fromObject(productsArray[0]);
      const productPayload: CreateProductDto = {
        ...productEntity,
        category: productEntity.category as string,
      };
      jest
        .spyOn(productRepository, 'createProduct')
        .mockResolvedValue(productEntity);
      jest
        .spyOn(categoryRepository, 'getCategoryById')
        .mockResolvedValue(null);

      expect(
        service.createProduct(productPayload),
      ).rejects.toThrow();
      expect(
        service.createProduct(productPayload),
      ).rejects.toBeInstanceOf(NotFoundException);
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
    it('should throw an error if the category does not exist', async () => {
      const productId = '1';
      const productEntity = ProductEntity.fromObject(productsArray[0]);
      const productPayload: UpdateProductDto = {
        ...productEntity,
        category: productEntity.category as string,
      };
      jest.spyOn(productRepository, 'updateProduct').mockResolvedValue(productEntity);
      jest.spyOn(categoryRepository, 'getCategoryById').mockResolvedValue(null);

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
