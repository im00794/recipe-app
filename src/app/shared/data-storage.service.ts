import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  apiUrl = 'https://ng-recipe-app-eb76f.firebaseio.com/';
  jsonSuf = 'recipes.json';


  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.apiUrl + this.jsonSuf).pipe(
      map(
        recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
      tap(
        recipes => this.recipeService.setRecipes(recipes)
      )
    );
  }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.apiUrl + this.jsonSuf,
      recipes).subscribe(recipe => console.log(recipe));
  }

  clearRecipes() {
    return this.http.delete(this.apiUrl + this.jsonSuf).subscribe();
  }

}
