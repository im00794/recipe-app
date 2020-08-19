import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;

  @Output() ingredientEntered = new EventEmitter<{ ingredient: Ingredient, operation: string }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addIngredient(): void {
    this.ingredientEntered.emit({
      ingredient: new Ingredient(
        this.nameInput.nativeElement.value,
        this.amountInput.nativeElement.value),
      operation: 'add'
    });
  }
}
