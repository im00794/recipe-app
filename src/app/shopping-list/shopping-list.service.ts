import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  ingredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [new Ingredient('Apples', 2),
    new Ingredient('Banana', 15),
    new Ingredient('Orange', 7)];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients);
  }
}
