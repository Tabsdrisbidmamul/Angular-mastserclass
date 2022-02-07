import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRecipes as IRecipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: IRecipe;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelect(event) {
    event.preventDefault();
    this.recipeSelected.emit();
  }
}
