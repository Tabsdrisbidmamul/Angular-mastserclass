import { Component, OnInit } from '@angular/core';
import { IIngredient, Ingredient } from '../models/ingreidents.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: IIngredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3),
  ];
  constructor() {}

  ngOnInit(): void {}
}
