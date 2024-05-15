export interface ProductEntityOptions {
  id: string;
  name: string;
  price: number;
  description: string;
  images?: string[];
}

export class ProductEntity {
  public id: string;
  public name: string;
  public price: number;
  public description: string;
  public images?: string[];

  constructor(options: ProductEntityOptions) {
    this.id = options.id;
    this.name = options.name;
    this.price = options.price;
    this.description = options.description;
    this.images = options.images;
  }
}
