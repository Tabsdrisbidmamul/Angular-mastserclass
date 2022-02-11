import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { IIngredient, Ingredient } from '../models/ingreidents.model';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientAdded$ = new Subject<IIngredient[]>();
  
  shoppingEditForm$ = new ReplaySubject<{ name: string; amount: number }>(1);
  shoppingEditFormObject: { name: string; amount: number } = {
    name: '',
    amount: 0,
  };

  private _ingredients: IIngredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
  ];

  get ingredients() {
    return this._ingredients.slice();
  }

  storeShopping(data: { name: string; amount: number }) {
    this.shoppingEditForm$.next(data);
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
    this.shoppingEditForm$.subscribe((data) => {
      this.addIngredient(new Ingredient(data.name, data.amount));
    });
  }
}
