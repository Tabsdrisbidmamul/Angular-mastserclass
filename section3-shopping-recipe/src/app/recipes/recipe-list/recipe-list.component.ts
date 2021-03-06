import { Component, OnInit } from '@angular/core';
import { IRecipes, Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: IRecipes[] = [
    new Recipe(
      'test',
      'test recipe desc',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'
    ),
    new Recipe(
      'test',
      'test recipe desc',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
