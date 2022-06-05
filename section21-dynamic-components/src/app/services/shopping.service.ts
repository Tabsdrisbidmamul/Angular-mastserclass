import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import {
  IIngredient,
  IIngredientId,
  Ingredient,
} from '../models/ingreidents.model';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { AgentService } from './agent.service';

@Injectable({ providedIn: 'root' })
export class ShoppingService extends AgentService {
  ingredientAdded$ = new ReplaySubject<IIngredientId[]>(1);
  ingredientEditing$ = new Subject<IIngredient>();
  shoppingEditForm$ = new ReplaySubject<IIngredientId>(1);

  shoppingEditFormObject: IIngredientId = {
    name: '',
    amount: null,
    id: uuidv4(),
  };

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  private _ingredients: IIngredientId[] = [];

  get ingredients() {
    return this._ingredients.slice();
  }

  storeEditIngredient(ingredient: IIngredient) {
    this.ingredientEditing$.next(ingredient);
  }

  storeShopping(data: IIngredientId) {
    this.shoppingEditForm$.next(data);
  }

  addIngredients(ingredients: IIngredientId[]) {
    this._ingredients = ingredients;
    this.ingredientAdded$.next(ingredients);
  }

  addIngredient(ingredient: IIngredientId) {
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
        this.addIngredient(new Ingredient(data.name, data.amount, data.id));
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

  deleteIngredient(ingredient: IIngredientId) {
    this._ingredients = this._ingredients.filter(
      (_ingredient) => _ingredient.name !== ingredient.name
    );

    this.ingredientAdded$.next(this.ingredients);
  }

  fetchIngredients() {
    this.fetch<IIngredientId>('shoppingList').subscribe((data) => {
      const _data = data.body ?? [];
      this.addIngredients(_data);
    });
  }

  putIngredients() {
    this.ingredientAdded$
      .subscribe((ingredients) => {
        this._ingredients = ingredients;
      })
      .unsubscribe();

    this.put<IIngredient[]>('shoppingList', this.ingredients).subscribe(
      (data) => {
        const _data = data as IIngredientId[];
        this.addIngredients(_data);
      }
    );
  }
}
