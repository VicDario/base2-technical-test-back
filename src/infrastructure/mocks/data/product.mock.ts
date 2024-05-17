import { ProductEntity } from '@/entities/product.entity';

export const productsArray: ProductEntity[] = [
  {
    id: '1',
    sku: '00001',
    name: 'T-shirt',
    brand: 'Lacoste',
    price: 300,
    category: '1',
    stock: 4,
    description: 'A nice t-shirt',
  },
  {
    id: '2',
    sku: '00002',
    name: 'Orange',
    brand: 'generic-brand',
    price: 300,
    category: '2',
    stock: 5,
    description: 'A delicious orange',
  },
  {
    id: '3',
    sku: '00003',
    name: 'PS5',
    brand: 'Sony',
    price: 300,
    category: '3',
    stock: 6,
    description: 'An amazing PS5',
  },
];
