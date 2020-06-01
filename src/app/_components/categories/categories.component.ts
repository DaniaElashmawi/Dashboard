import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../_services/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _categoryService: CategoriesService) { }
  categories = [];
  categoriesNames = [
    'category',
    'category1',
    'category2'
  ]

  loadAllCategories() {
    return this._categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      // console.log(this.categories);

    });
  }

  ngOnInit() {
    this.loadAllCategories();

  }

}
