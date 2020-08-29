import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class RecipeService {

  selectedRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [new Recipe('Hamburger',
    'This is a recipe to make a Hamburger',
    'https://www.simplyhappyfoodie.com/wp-content/uploads/2018/04/instant-pot-hamburgers-3.jpg'),
    new Recipe('Hamburger',
      'This is a recipe to make a Hamburger',
      'https://www.simplyhappyfoodie.com/wp-content/uploads/2018/04/instant-pot-hamburgers-3.jpg')];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
