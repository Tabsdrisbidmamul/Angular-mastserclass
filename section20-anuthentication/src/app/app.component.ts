import { Component, OnInit } from '@angular/core';
import { AgentService } from './services/agent.service';
import { RecipeService } from './services/recipe.service';
import { ShoppingService } from './services/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shopping-recipe';

  constructor(
    private _shoppingService: ShoppingService,
    private _recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this._shoppingService.fetchIngredients();
    this._recipeService.fetchRecipes().subscribe();
  }
}
