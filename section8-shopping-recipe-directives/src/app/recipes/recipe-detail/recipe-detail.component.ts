import { Component, Input, OnInit } from '@angular/core';
import { IRecipes } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() currentRecipe: IRecipes;

  constructor() {}

  ngOnInit(): void {}
}
