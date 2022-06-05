import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IRecipeId } from '../models/recipe.model';

import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<IRecipeId[]> {
  constructor(private _recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IRecipeId[] | Observable<IRecipeId[]> | Promise<IRecipeId[]> {
    const recipes = this._recipeService.recipes;
    return recipes.length > 0 ? recipes : this._recipeService.fetchRecipes();
  }
}
