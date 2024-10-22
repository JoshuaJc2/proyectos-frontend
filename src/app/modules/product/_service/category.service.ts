import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  private source = "/category";

  constructor(private http: HttpClient) {}

  activeCategory(categoryId:number):Observable<any>{
    return this.http.put(api_dwb_uri + this.source + "/" + categoryId + "/activate", null);
  }
  
  createCategory(category: any): Observable<any>{
    return this.http.post(api_dwb_uri + this.source, category);
  }

  deleteCategory(categoryId:number): Observable<any>{
    return this.http.delete(api_dwb_uri + this.source + "/" + categoryId);
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
  
  updateCategory(category:Category,categoryId:number) : Observable<any>{
    return this.http.put(api_dwb_uri + this.source + "/" + categoryId, category);
  }
}
