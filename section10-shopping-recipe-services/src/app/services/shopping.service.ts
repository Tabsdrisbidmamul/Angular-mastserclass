import { EventEmitter, Injectable } from '@angular/core';
import { IIngredient, Ingredient } from '../models/ingreidents.model';

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  ingredientAdded = new EventEmitter<IIngredient[]>();

  private _ingredients: IIngredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
  ];

  get ingredients() {
    return this._ingredients.slice();
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
    this.ingredientAdded.emit(this.ingredients);
  }
}
