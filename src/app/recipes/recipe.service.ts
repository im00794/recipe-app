import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [new Recipe('Hamburger',
    'This is a recipe to make a Hamburger',
    'https://www.simplyhappyfoodie.com/wp-content/uploads/2018/04/instant-pot-hamburgers-3.jpg',
    [new Ingredient('bread', 2),
      new Ingredient('tomato', 1),
      new Ingredient('meat', 1)]),

    new Recipe('Cheeseburger',
      'This is a recipe to make a Cheeseburger',
      'https://www.simplyhappyfoodie.com/wp-content/uploads/2018/04/instant-pot-hamburgers-3.jpg',
      [new Ingredient('bread', 2),
        new Ingredient('tomato', 2),
        new Ingredient('cheese', 3),
        new Ingredient('meat', 1)])];

  constructor(private shoppingListService: ShoppingListService) {
  }


  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id].name = recipe.name;
    this.recipes[id].description = recipe.description;
    this.recipes[id].imagePath = recipe.imagePath;
    this.recipes[id].ingredients = recipe.ingredients;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
