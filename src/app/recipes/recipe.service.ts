import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({providedIn: 'root'})
export class RecipeService {


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

  updateRecipe(id: number, name: string, description: string) {
    this.recipes[id].name = name;
    this.recipes[id].description = description;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
