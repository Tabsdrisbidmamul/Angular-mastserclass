import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IIngredient, Ingredient } from 'src/app/models/ingreidents.model';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: IRecipe;

  constructor(
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentRecipe = this.recipeService.getRecipe(params['name']);
    });
  }

  sendToShoppingList() {
    this.currentRecipe.ingredients.forEach((ingredient: IIngredient) =>
      this.shoppingService.addIngredient(ingredient)
    );
    this.router.navigate(['shopping-list']);
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.currentRecipe);
    this.router.navigate(['recipes']);
  }
}
