import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRecipe } from 'src/app/models/recipe.model';
import { AgentService } from 'src/app/services/agent.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  recipes: IRecipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;

    this.recipeService.recipeAdded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  newRecipe() {
    this.router.navigate(['recipes', 'new']);
  }
}
