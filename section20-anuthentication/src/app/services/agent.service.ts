import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { IIngredient, IIngredientId } from '../models/ingreidents.model';
import { IRecipe, IRecipeId } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { ShoppingService } from './shopping.service';

@Injectable({ providedIn: 'root' })
export class AgentService {
  private recipes: IRecipe[] = [];
  private shoppingList: IIngredient[] = [];

  constructor(
    private _http: HttpClient,
    private _recipeService: RecipeService,
    private _shoppingService: ShoppingService
  ) {}

  private fetch<Type>(endpoint: string) {
    return this._http.get<Type[]>(endpoint, { observe: 'response' });
  }

  private put<Type>(endpoint: string, putData: Type) {
    return this._http.put<Type>(endpoint, this.addId(putData));
  }

  fetchRecipes() {
    return this.fetch<IRecipeId>('recipes')
      .pipe(
        map((recipes) => {
          return recipes.body?.map((el: IRecipeId) => {
            return {
              ...el,
              ingredients: !el.ingredients ? [] : el.ingredients,
            };
          });
        })
      )
      .pipe(
        tap((data) => {
          const _data = data ?? [];
          this._recipeService.addRecipes(_data);
        })
      );
  }

  putRecipes() {
    this._recipeService.recipeAdded$
      .subscribe((recipes) => {
        this.recipes = recipes;
      })
      .unsubscribe();

    this.put<IRecipe[]>('recipes', this.recipes).subscribe((data) => {
      const _data = data as IRecipeId[];
      this._recipeService.addRecipes(_data);
    });
  }

  fetchIngredients() {
    this.fetch<IIngredientId>('shoppingList').subscribe((data) => {
      const _data = data.body ?? [];
      this._shoppingService.addIngredients(_data);
    });
  }

  putIngredients() {
    this._shoppingService.ingredientAdded$
      .subscribe((ingredients) => {
        this.shoppingList = ingredients;
      })
      .unsubscribe();

    this.put<IIngredient[]>('shoppingList', this.shoppingList).subscribe(
      (data) => {
        const _data = data as IIngredientId[];
        this._shoppingService.addIngredients(_data);
      }
    );
  }

  private addId<Type>(data: Type) {
    if (data instanceof Array) {
      const idArray = [];
      data.forEach((type) => {
        idArray.push({ ...type, id: uuidv4() });
      });

      return idArray;
    }
  }
}
