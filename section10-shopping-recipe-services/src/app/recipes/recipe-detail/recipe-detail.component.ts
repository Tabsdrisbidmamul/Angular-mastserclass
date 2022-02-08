import { Component, Input, OnInit } from '@angular/core';
import { IIngredient, Ingredient } from 'src/app/models/ingreidents.model';
import { IRecipe } from 'src/app/models/recipe.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() currentRecipe: IRecipe;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  sendToShoppingList() {
    this.currentRecipe.ingredients.forEach((ingredient: IIngredient) =>
      this.shoppingService.addIngredient(ingredient)
    );
  }
}
