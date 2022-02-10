import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingreidents.model';
import { IRecipe, Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new EventEmitter<IRecipe>();

  private recipes: IRecipe[] = [
    new Recipe(
      'Tasty-Schnitzel',
      'a super-tasty Schnitzel',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Chips', 20)]
    ),
    new Recipe(
      'Big-Fat-Burger',
      'Cholesterol build up waiting',
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/Healthy_Food_-_Colourful_Fruit_and_Veg_-_50191699151.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(name: string) {
    return this.recipes.find((_recipe) => _recipe.name.toLowerCase() === name);
  }
}
