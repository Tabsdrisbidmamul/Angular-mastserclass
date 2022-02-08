import { Component, OnInit } from '@angular/core';
import { IRecipes } from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipeSelected: IRecipes;

  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipe) {
    this.recipeSelected = recipe;
  }
}
