import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import {
  IIngredient,
  IIngredientId,
  Ingredient,
} from '../models/ingreidents.model';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientAdded$ = new ReplaySubject<IIngredientId[]>(1);
  ingredientEditing$ = new Subject<IIngredient>();
  shoppingEditForm$ = new ReplaySubject<{ name: string; amount: number }>(1);

  shoppingEditFormObject: { name: string; amount: number } = {
    name: '',
    amount: null,
  };

  private _ingredients: IIngredient[] = [];

  get ingredients() {
    return this._ingredients.slice();
  }

  storeEditIngredient(ingredient: IIngredient) {
    this.ingredientEditing$.next(ingredient);
  }

  storeShopping(data: { name: string; amount: number }) {
    this.shoppingEditForm$.next(data);
  }

  addIngredients(ingredients: IIngredientId[]) {
    this._ingredients = ingredients;
    this.ingredientAdded$.next(ingredients);
  }

  addIngredient(ingredient: IIngredient) {
    const ingredientIndex = this.ingredients.findIndex(
      (_ingredient) => _ingredient.name === ingredient.name
    );

    if (ingredientIndex !== -1) {
      this._ingredients[ingredientIndex].amount += ingredient.amount;
    } else {
      this._ingredients.push(ingredient);
    }
    this.ingredientAdded$.next(this.ingredients);
  }

  addIngredient$() {
    this.shoppingEditForm$
      .subscribe((data) => {
        this.addIngredient(new Ingredient(data.name, data.amount));
      })
      .unsubscribe();
  }

  editIngredient$() {
    this.shoppingEditForm$
      .subscribe((data) => {
        const index = this._ingredients.findIndex(
          (el) => el.name === data.name
        );

        this._ingredients[index] = data;
      })
      .unsubscribe();

    this.ingredientAdded$.next(this.ingredients);
  }

  deleteIngredient(ingredient: IIngredient) {
    this._ingredients = this._ingredients.filter(
      (_ingredient) => _ingredient.name !== ingredient.name
    );

    this.ingredientAdded$.next(this.ingredients);
  }
}
