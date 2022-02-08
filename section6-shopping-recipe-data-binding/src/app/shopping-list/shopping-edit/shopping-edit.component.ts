import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IIngredient, Ingredient } from 'src/app/models/ingreidents.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') ingredientName: ElementRef;
  @ViewChild('amountInput') ingredientAmount: ElementRef;
  @Output() ingredientToAdd = new EventEmitter<IIngredient>();

  constructor() {}

  ngOnInit(): void {}

  onAddIngredient() {
    const ingredientName = this.ingredientName.nativeElement.value;
    const ingredientAmount = this.ingredientAmount.nativeElement.value;

    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.ingredientToAdd.emit(newIngredient);
  }
}
