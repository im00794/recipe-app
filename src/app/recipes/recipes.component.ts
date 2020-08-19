import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None , Native
})
export class RecipesComponent implements OnInit {

  recipe: Recipe;
  constructor() {
  }

  ngOnInit(): void {
  }

}
