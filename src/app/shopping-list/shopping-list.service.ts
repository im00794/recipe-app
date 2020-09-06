import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {

  ingredientAdded = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [new Ingredient('apples', 2),
    new Ingredient('banana', 15),
    new Ingredient('orange', 7),
    new Ingredient('meat', 20)];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
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
    this.ingredientAdded.next(this.ingredients.slice());

    //op2
    // this.ingredients.push(...ingredients);
  }
}
