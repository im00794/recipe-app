import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  id: number;
  editMode: boolean = false;
  @ViewChild('nameRecipe', {static: true}) nameRecipe: ElementRef;
  @ViewChild('descriptionRecipe', {static: true}) descriptionRecipe: ElementRef;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
          this.nameRecipe.nativeElement.value = this.recipe.name;
          this.descriptionRecipe.nativeElement.value = this.recipe.description;
        }
      }
    );
  }

  addRecipe() {

  }

  editRecipe(id: number) {
    this.recipeService.updateRecipe(id, this.nameRecipe.nativeElement.value, this.descriptionRecipe.nativeElement.value);
  }

}
