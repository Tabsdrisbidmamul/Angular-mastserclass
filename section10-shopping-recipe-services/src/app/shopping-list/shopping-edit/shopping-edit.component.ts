import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IIngredient, Ingredient } from 'src/app/models/ingreidents.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') ingredientName: ElementRef;
  @ViewChild('amountInput') ingredientAmount: ElementRef;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {}

  onAddIngredient() {
    const ingredientName = this.ingredientName.nativeElement.value;
    const ingredientAmount = this.ingredientAmount.nativeElement.value;

    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingService.addIngredient(newIngredient);
  }
}
