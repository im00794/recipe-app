import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  collapsed = true;

  constructor(private dataStorageService: DataStorageService) {
  }

  clearData(): void {
    this.dataStorageService.clearRecipes();
  }

  saveData(): void {
    this.dataStorageService.saveRecipes();
  }

  fetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
