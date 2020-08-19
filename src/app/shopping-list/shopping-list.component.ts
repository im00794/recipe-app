import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [new Ingredient('Apples', 2),
    new Ingredient('Banana', 15)];

  constructor() {
  }

  ngOnInit(): void {
  }

  doOperation(eventData: { ingredient: Ingredient, operation: string }): void {
    if (eventData.operation === 'add') {
      this.ingredients.push(eventData.ingredient);
    }
  }
}
