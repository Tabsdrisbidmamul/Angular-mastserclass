import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Ingredient } from '../models/ingreidents.model';
import { IRecipe, IRecipeId, Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new ReplaySubject<IRecipe>(1);
  recipeAdded = new Subject<IRecipe[]>();

  selectedRecipe$: Observable<IRecipe>;
  recipeAdded$: Observable<IRecipeId[]>;

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

  private _recipes: IRecipe[] = [];

  get recipes() {
    return this._recipes.slice();
  }

  getRecipe(name: string) {
    return this._recipes.find((_recipe) => _recipe.name.toLowerCase() === name);
  }

  addRecipes(recipes: IRecipeId[]) {
    this._recipes = recipes;
    this.recipeAdded.next(this.recipes);
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
