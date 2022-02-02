export interface IRecipes {
  name: string;
  description: string;
  imagePath: string;
}

export class Recipe implements IRecipes {
  name = '';
  description = '';
  imagePath = '';

  constructor(name: string, description: string, imagePath: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
