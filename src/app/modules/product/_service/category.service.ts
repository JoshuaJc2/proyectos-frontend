import { Injectable } from '@angular/core';
import { Category } from '../_model/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  private source = "/category";

  constructor(
    private http: HttpClient
  ) { }
  
  createCategory(category: any): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, category);
  }

  getActiveCategories(){
    return this.http.get(api_dwb_uri + this.source + "/active")
  }

  getCategory(categoryId:number) : Observable<any>{
    return this.http.get(api_dwb_uri + this.source + "/" + categoryId); 
  }

  getCategories() : Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  } 
}
