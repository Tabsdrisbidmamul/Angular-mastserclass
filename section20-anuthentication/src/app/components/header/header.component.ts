import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private routeUrl = '';

  constructor(
    private _router: Router,
    private _recipeService: RecipeService,
    private _shoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeUrl = event.url;
      }
    });
  }

  onSaveHandler() {
    if (this.routeUrl.includes('recipes')) {
      this._recipeService.putRecipes();
    }

    if (this.routeUrl.includes('shopping-list')) {
      this._shoppingService.putIngredients();
    }
  }

  onFetchHandler() {
    if (this.routeUrl.includes('recipes')) {
      this._recipeService.fetchRecipes().subscribe();
    }

    if (this.routeUrl.includes('shopping-list')) {
      this._shoppingService.fetchIngredients();
    }
  }
}
