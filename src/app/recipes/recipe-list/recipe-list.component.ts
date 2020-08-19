import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [new Recipe('Hamburger',
    'This is a recipe to make a Hamburger',
    'https://www.simplyhappyfoodie.com/wp-content/uploads/2018/04/instant-pot-hamburgers-3.jpg'),
    new Recipe('Hamburger',
      'This is a recipe to make a Hamburger',
      'https://www.simplyhappyfoodie.com/wp-content/uploads/2018/04/instant-pot-hamburgers-3.jpg')];

  constructor() {
  }

  ngOnInit(): void {
  }

  afterRecipeSelected(selectedRecipe: Recipe): void {
    this.recipeWasSelected.emit(selectedRecipe);
  }

}
