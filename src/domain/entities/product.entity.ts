import { CategoryEntity } from './category.entity';

export interface ProductEntityOptions {
  id?: string;
  sku: string;
  name: string;
  price: number;
  description: string;
  category: CategoryEntity | string;
  images?: string[];
}

export class ProductEntity {
  public id?: string;
  public sku: string;
  public name: string;
  public price: number;
  public description: string;
  public category: CategoryEntity | string;
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

  static fromObject(object: { [key: string]: any }): ProductEntity {
    const { id, sku, name, price, description, images, category } = object;

    const product = new ProductEntity({
      id,
      sku,
      name,
      price,
      description,
      images,
      category:
        typeof category === 'string'
          ? category
          : CategoryEntity.fromObject(category),
    });
    return product;
  }

  static fromPartial(partial: { [key: string]: any }): ProductEntity {
    const product = new ProductEntity({
      sku: partial.sku,
      name: partial.name,
      price: partial.price,
      description: partial.description,
      category: partial.category,
      images: partial.images,
    });
    return product;
  }
}
