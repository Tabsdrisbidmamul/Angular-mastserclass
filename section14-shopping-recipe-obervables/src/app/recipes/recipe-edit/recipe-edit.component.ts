import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  selectedRecipe: IRecipe | null = null;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipeService.getRecipe(params['name']);
    });

    this.route.url.subscribe((segment) => {
      this.editMode = segment.some((url) => {
        return url.path === 'edit';
      });
    });
  }
}
