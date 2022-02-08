import { Component, OnInit } from '@angular/core';
import { IIngredient, Ingredient } from '../models/ingreidents.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: IIngredient[] = [];
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredients;
    this.shoppingService.ingredientAdded.subscribe(
      (ingredients: IIngredient[]) => (this.ingredients = ingredients)
    );
  }
}
