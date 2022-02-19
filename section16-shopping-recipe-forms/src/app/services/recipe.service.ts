import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Ingredient } from '../models/ingreidents.model';
import { IRecipe, Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new ReplaySubject<IRecipe>(1);
  recipeAdded = new ReplaySubject<IRecipe[]>(1);

  selectedRecipe$: Observable<IRecipe>;
  recipeAdded$: Observable<IRecipe[]>;

  recipeForm: IRecipe = {
    name: '',
    imagePath: '',
    description: '',
    ingredients: [],
  };

  constructor() {
    this.selectedRecipe$ = this.selectedRecipe.asObservable();
    this.recipeAdded$ = this.recipeAdded.asObservable();
  }

  storeRecipe(recipe: IRecipe) {
    this.selectedRecipe.next(recipe);
  }

  storeRecipeForm(recipe) {
    this.recipeForm = { ...recipe };
  }

  private _recipes: IRecipe[] = [
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

  get recipes() {
    return this._recipes.slice();
  }

  getRecipe(name: string) {
    return this._recipes.find((_recipe) => _recipe.name.toLowerCase() === name);
  }

  addRecipe(recipe: IRecipe) {
    recipe.name = recipe.name.replace(/\s/g, '-');
    this._recipes.push(recipe);
    this.recipeAdded.next(this.recipes);
  }

  updateRecipe(recipe: IRecipe, index: number) {
    recipe.name = recipe.name.replace(/\s/g, '-');
    this._recipes[index] = recipe;
    this.recipeAdded.next(this.recipes);
  }

  deleteRecipe(recipe: IRecipe) {
    this._recipes = this._recipes.filter((el) => el.name !== recipe.name);
    this.recipeAdded.next(this.recipes);
  }
}
