import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IIngredient } from '../models/ingreidents.model';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  ingredients: IIngredient[] = [];
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredients;
    this.shoppingService.ingredientAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (ingredients: IIngredient[]) => (this.ingredients = ingredients)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
