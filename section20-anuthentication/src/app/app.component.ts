import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AgentService } from './services/agent.service';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { ShoppingService } from './services/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shopping-recipe';
  destroy$ = new Subject();

  constructor(
    private _shoppingService: ShoppingService,
    private _recipeService: RecipeService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.autoLogin();

    this._authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user !== null) {
        this._shoppingService.fetchIngredients();
        this._recipeService.fetchRecipes().subscribe();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }
}
