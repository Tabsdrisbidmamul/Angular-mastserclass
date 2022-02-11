import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IIngredient, Ingredient } from 'src/app/models/ingreidents.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  @ViewChild('nameInput') ingredientName: ElementRef;
  @ViewChild('amountInput') ingredientAmount: ElementRef;

  shoppingForm: FormGroup;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl(
        this.shoppingService.shoppingEditFormObject.name,
        Validators.required
      ),
      amount: new FormControl(
        this.shoppingService.shoppingEditFormObject.amount,
        [Validators.required, Validators.minLength(1)]
      ),
    });

    this.shoppingService.shoppingEditForm$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.shoppingForm.setValue(data);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onAddIngredient() {
    this.shoppingService.storeShopping(this.shoppingForm.value);
    this.shoppingService.addIngredient$();
  }

  submit() {
    this.onAddIngredient();
  }
}
