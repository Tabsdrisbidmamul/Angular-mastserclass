import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  shoppingForm: FormGroup;
  editMode = false;
  selectedIngredient: IIngredient;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl(
        this.shoppingService.shoppingEditFormObject.name,
        Validators.required
      ),
      amount: new FormControl(
        this.shoppingService.shoppingEditFormObject.amount,
        [Validators.required, Validators.min(1)]
      ),
    });

    this.shoppingService.shoppingEditForm$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.shoppingForm.setValue(data);
        }
      });

    this.shoppingService.ingredientEditing$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ingredient: IIngredient) => {
        this.editMode = true;
        this.selectedIngredient = ingredient;

        this.shoppingForm.setValue(ingredient);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  clearForm() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  onAddIngredient() {
    this.shoppingService.storeShopping(this.shoppingForm.value);
    this.shoppingService.addIngredient$();
  }

  onEditIngredient() {
    this.shoppingService.storeShopping(this.shoppingForm.value);
    this.shoppingService.editIngredient$();
  }

  deleteIngredient() {
    this.shoppingService.deleteIngredient(this.selectedIngredient);

    this.clearForm();
  }

  submit() {
    this.editMode ? this.onEditIngredient() : this.onAddIngredient();

    this.clearForm();
  }
}
