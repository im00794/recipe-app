import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None , Native
})
export class RecipesComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.selectedRecipe.subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      }
    );
  }

}
