import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  constructor() { }
  
  getCategories() : Category[]{
    let categories : Category[] = [];
    categories.push(new Category(0, "a", "a", 0));
    categories.push(new Category(1, "b", "b", 1));
    categories.push(new Category(2, "c", "c", 0));
    return categories;
  } 
}
