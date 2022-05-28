import { IIngredient, IIngredientId } from './ingreidents.model';

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: IIngredient[];
}

export interface IRecipeId {
  name: string;
  description: string;
  imagePath: string;
  ingredients: IIngredientId[];
  id?: string;
}

export class Recipe implements IRecipe {
  name = '';
  description = '';
  imagePath = '';
  ingredients: IIngredientId[];

  constructor(
    name: string,
    description: string,
    imagePath: string,
    ingredients: IIngredientId[]
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
