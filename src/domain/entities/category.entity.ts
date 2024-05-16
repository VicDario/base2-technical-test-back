interface CategoryEntityOptions {
  id?: string;
  name: string;
}

export class CategoryEntity {
  id?: string;
  name: string;

  constructor(options: CategoryEntityOptions) {
    this.id = options.id;
    this.name = options.name;
  }

  static fromObject(object: { [key: string]: any }) {
    const { id, name } = object;
    const category = new CategoryEntity({ id, name });
    return category;
  }
}
