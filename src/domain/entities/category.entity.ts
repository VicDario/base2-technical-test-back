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
}
