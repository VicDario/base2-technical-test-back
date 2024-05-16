import { CategoryEntity } from './category.entity';

export interface ProductEntityOptions {
  id?: string;
  sku: string;
  name: string;
  price: number;
  description: string;
  category: CategoryEntity;
  images?: string[];
}

export class ProductEntity {
  public id?: string;
  public sku: string;
  public name: string;
  public price: number;
  public description: string;
  public category: CategoryEntity;
  public images?: string[];

  constructor(options: ProductEntityOptions) {
    const { id, sku, name, price, description, images, category } = options;
    this.id = id;
    this.sku = sku;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.images = images;
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, sku, name, price, description, images, category } = object;
    const categoryEntity = CategoryEntity.fromObject(category);
    const product = new ProductEntity({
      id,
      sku,
      name,
      price,
      description,
      images,
      category: categoryEntity,
    });
    return product;
  }
}
