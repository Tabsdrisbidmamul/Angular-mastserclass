import { IIngredient } from './ingreidents.model';

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: IIngredient[];
}

export class Recipe implements IRecipe {
  name = '';
  description = '';
  imagePath = '';
  ingredients: IIngredient[];

  constructor(
    name: string,
    description: string,
    imagePath: string,
    ingredients: IIngredient[]
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
