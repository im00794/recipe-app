import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  @ViewChild('ingredientForm', {static: true}) ingredientForm: NgForm;
  subscription = new Subscription();
  editMode = false;
  indexEdit: number;


  constructor(private shoppingListService: ShoppingListService) {
  }


  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientEdited.subscribe((index) => {
      this.editMode = true;
      this.indexEdit = index;
      const ingredient = this.shoppingListService.getIngredient(this.indexEdit);
      this.ingredientForm.setValue({
        nameIngredient: ingredient.name,
        amountIngredient: ingredient.amount
      });
    });
  }

  onSubmit(): void {
    const value = this.ingredientForm.value;
    const ingredient = new Ingredient(value.nameIngredient, value.amountIngredient);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.indexEdit, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.indexEdit);
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onClear(): void {
    if (confirm('Are you sure ?')) {
      this.shoppingListService.clearIngredients();
      this.editMode = false;
      this.ingredientForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
