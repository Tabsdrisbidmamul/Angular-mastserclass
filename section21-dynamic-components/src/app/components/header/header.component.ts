import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private routeUrl = '';
  private destroy$ = new Subject();
  isLoggedIn = false;

  constructor(
    private _router: Router,
    private _recipeService: RecipeService,
    private _shoppingService: ShoppingService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeUrl = event.url;
      }
    });

    this._authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user !== null && user?.token !== null) {
        this.isLoggedIn = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.unsubscribe();
  }

  onLogoutHandler() {
    this._authService.logout();
    this.isLoggedIn = false;
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
