import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRecipe, IRecipeId } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  selectedRecipe: IRecipeId | null = null;
  editMode = false;

  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipeService.getRecipe(params['name']);
      this.recipeService.storeRecipe(this.selectedRecipe);
      this.recipeService.selectedRecipe$
        .pipe(takeUntil(this.destroy$))
        .subscribe((recipe) => {
          this.recipeService.storeRecipeForm(recipe);
        });
      this.initForm();
    });

    this.route.url.subscribe((segment) => {
      this.editMode = segment.some((url) => {
        return url.path === 'edit';
      });
    });

    if (this.editMode) {
      this.recipeForm.setValue(this.selectedRecipe);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  submit() {
    if (this.editMode) {
      const index = this.recipeService.recipes.findIndex(
        (el) => el.name === this.selectedRecipe.name
      );

      if (index === -1) {
        return;
      }

      this.recipeService.updateRecipe(this.recipeForm.value, index);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.clearForm();
    this.router.navigate(['recipes']);
  }

  clearForm() {
    this.editMode = false;
    this.recipeForm.reset();
    this.router.navigate(['recipes']);
  }

  private initForm() {
    let recipeIngredients = [
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      }),
    ];

    if (
      this.selectedRecipe &&
      this.recipeService.recipeForm.ingredients.length > 0
    ) {
      recipeIngredients = [];
      this.recipeService.recipeForm.ingredients.forEach((el) => {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(el.name, Validators.required),
            amount: new FormControl(el.amount, [
              Validators.required,
              Validators.min(1),
            ]),
          })
        );
      });
    }

    let id: string =
      this.selectedRecipe !== undefined ? this.selectedRecipe.id : uuidv4();

    console.log('id ', id);

    this.recipeForm = new FormGroup({
      name: new FormControl(
        this.recipeService.recipeForm.name,
        Validators.required
      ),

      imagePath: new FormControl(
        this.recipeService.recipeForm.imagePath,
        Validators.required
      ),

      description: new FormControl(
        this.recipeService.recipeForm.description,
        Validators.required
      ),

      ingredients: new FormArray(recipeIngredients),

      id: new FormControl(id, Validators.required),
    });

    console.log('recipe form ', this.recipeForm);
  }

  addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      })
    );
  }

  deleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  get ingredientsControl() {
    const array = this.recipeForm.get('ingredients') as FormArray;
    return array.controls;
  }
}
