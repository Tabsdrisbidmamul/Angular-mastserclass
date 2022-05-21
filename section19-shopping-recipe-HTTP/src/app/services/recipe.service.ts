import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Ingredient } from '../models/ingreidents.model';
import { IRecipe, IRecipeId, Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new ReplaySubject<IRecipeId>(1);
  recipeAdded = new ReplaySubject<IRecipeId[]>(1);

  selectedRecipe$: Observable<IRecipeId>;
  recipeAdded$: Observable<IRecipeId[]>;

  recipeForm: IRecipeId = {
    name: '',
    imagePath: '',
    description: '',
    ingredients: [],
    id: null,
  };

  constructor() {
    this.selectedRecipe$ = this.selectedRecipe.asObservable();
    this.recipeAdded$ = this.recipeAdded.asObservable();
  }

  storeRecipe(recipe: IRecipeId) {
    this.selectedRecipe.next(recipe);
  }

  storeRecipeForm(recipe) {
    this.recipeForm = { ...recipe };
  }

  private _recipes: IRecipeId[] = [];

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

  addRecipe(recipe: IRecipeId) {
    recipe.name = recipe.name.replace(/\s/g, '-');
    this._recipes.push(recipe);
    this.recipeAdded.next(this.recipes);
  }

  updateRecipe(recipe: IRecipeId, index: number) {
    recipe.name = recipe.name.replace(/\s/g, '-');
    this._recipes[index] = recipe;
    this.recipeAdded.next(this.recipes);
  }

  deleteRecipe(recipe: IRecipeId) {
    this._recipes = this._recipes.filter((el) => el.name !== recipe.name);
    this.recipeAdded.next(this.recipes);
  }
}
