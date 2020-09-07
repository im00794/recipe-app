import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  ingredientChanged = new Subject<Ingredient[]>();
  ingredientEdited = new Subject<number>();

  private ingredients: Ingredient[] = [new Ingredient('apples', 2),
    new Ingredient('banana', 15),
    new Ingredient('orange', 7),
    new Ingredient('meat', 20)];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id] = ingredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  clearIngredients() {
    this.ingredients.length = 0;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      const indexIngredient = this.ingredients
        .map((ingrediente) => ingrediente.name)
        .indexOf(ingredient.name);
      if (indexIngredient !== -1) {
        this.ingredients[indexIngredient].amount += ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    });
    this.ingredientChanged.next(this.ingredients.slice());

    //op2
    // this.ingredients.push(...ingredients);
  }
}
