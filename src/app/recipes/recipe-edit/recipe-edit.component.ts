import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  @ViewChild('nameRecipe', {static: true}) nameRecipe: ElementRef;
  @ViewChild('descriptionRecipe', {static: true}) descriptionRecipe: ElementRef;
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.id = +params['id'];
        this.initForm();
      }
    );
  }

  getControls() {
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.recipeForm.reset();
    }
  }

  onCancel() {
    if (confirm('Are you sure ?')) {
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null),
      'amount': new FormControl(null)
    }));
  }

  onDeleteIngredient(id: number) {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(id);
  }

  private initForm() {
    let recipe = new Recipe();
    let ingredientsRecipe = new FormArray([]);
    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          const ingredientData = new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
          });
          ingredientsRecipe.push(ingredientData);
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'ingredients': ingredientsRecipe
    });

  }

}
