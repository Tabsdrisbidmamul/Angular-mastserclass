import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IRecipes, Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<IRecipes>();

  recipes: IRecipes[] = [
    new Recipe(
      'test 1',
      'test 1 recipe desc',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'
    ),
    new Recipe(
      'test 2',
      'test 2 recipe desc',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipe: IRecipes) {
    this.recipeSelected.emit(recipe);
  }
}
