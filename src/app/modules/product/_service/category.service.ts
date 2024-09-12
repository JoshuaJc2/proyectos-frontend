import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  constructor() { }
  
  getCategories() : Category[]{
    let categories : Category[] = [];
    let category : Category =  new Category(0, "a", "a", 0); categories.push(category);
    category =  new Category(1, "b", "b", 1); categories.push(category); 
    category =  new Category(2, "c", "c", 0);categories.push(category);
    return categories;
  } 
}
