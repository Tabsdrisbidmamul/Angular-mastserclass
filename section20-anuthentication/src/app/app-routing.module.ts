import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeResolverService } from './services/recipe-resolver.service';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':name',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':name/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    children: [
      {
        path: ':name',
        component: ShoppingEditComponent,
      },
    ],
  },

  // {
  //   path: 'not-found',
  //   component: ErrorPageComponent,
  //   data: { message: 'Page not found!' },
  // },
  // {
  //   path: '**',
  //   redirectTo: '/not-found',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
