import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsUseCasesService } from '@/use-cases/products-use-cases/products.use-cases.service';
import { mockProductsUseCases } from '@/infrastructure/mocks/use-cases/products.use-cases.mock';
import { PaginationDto } from '@/dtos/query.dto';
import { productsArray } from '@/infrastructure/mocks/data/product.mock';
import { ProductEntity } from '@/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@/dtos/product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsUseCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsUseCasesService,
          useValue: mockProductsUseCases,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsUseCasesService>(ProductsUseCasesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a list of products', async () => {
    const paginationDto: PaginationDto = { limit: 10, offset: 0 };
    const mockedProducts = productsArray
      .filter((_, index) => index < paginationDto.limit)
      .map(ProductEntity.fromObject);
    const mockedResult = {
      products: mockedProducts,
      total: mockedProducts.length,
    };
    jest.spyOn(service, 'getProducts').mockResolvedValue(mockedResult);

    const result = await controller.getProducts(paginationDto, {});

    expect(result).toBe(mockedResult);
    result.products.forEach((product) =>
      expect(product).toBeInstanceOf(ProductEntity),
    );
    expect(service.getProducts).toHaveBeenCalledWith(paginationDto);
  });

  it('should get a product by id', async () => {
    const id = '1';
    const mockedResult = ProductEntity.fromObject(productsArray[0]);
    jest.spyOn(service, 'getProductById').mockResolvedValue(mockedResult);

    const result = await controller.getProduct(id);

    expect(result).toBe(mockedResult);
    expect(result).toBeInstanceOf(ProductEntity);
    expect(service.getProductById).toHaveBeenCalledWith(id);
  });

  it('should create a product', async () => {
    const productDto: CreateProductDto = {
      name: 'Product',
      price: 100,
      category: 'Category',
      sku: '00001',
      brand: 'Brand',
      description: 'Description',
      stock: 10,
    };
    const mockedResult = ProductEntity.fromObject(productDto);
    jest.spyOn(service, 'createProduct').mockResolvedValue(mockedResult);

    const result = await controller.createProduct(productDto);

    expect(result).toBe(mockedResult);
    expect(result).toBeInstanceOf(ProductEntity);
    expect(service.createProduct).toHaveBeenCalledWith(productDto);
  });

  it('should update a product', async () => {
    const id = '1';
    const productDto: UpdateProductDto = {
      name: 'new Name',
      stock: 8,
    };
    const mockedResult = ProductEntity.fromObject(productsArray[0]);
    jest.spyOn(service, 'updateProduct').mockResolvedValue(mockedResult);

    const result = await controller.updateProduct(id, productDto);

    expect(result).toBe(mockedResult);
    expect(result).toBeInstanceOf(ProductEntity);
    expect(service.updateProduct).toHaveBeenCalledWith(id, productDto);
  });

  it('should delete a product', async () => {
    const id = '1';
    const mockedResult = ProductEntity.fromObject(productsArray[0]);
    jest.spyOn(service, 'deleteProduct').mockResolvedValue(mockedResult);

    const result = await controller.deleteProduct(id);

    expect(result).toBe(mockedResult);
    expect(result).toBeInstanceOf(ProductEntity);
    expect(service.deleteProduct).toHaveBeenCalledWith(id);
  });
});
