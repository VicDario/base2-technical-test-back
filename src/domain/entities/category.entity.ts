interface CategoryEntityOptions {
  id: number;
  name: string;
}

export class CategoryEntity {
  id: number;
  name: string;

  constructor(options: CategoryEntityOptions) {
    this.id = options.id;
    this.name = options.name;
  }
}
