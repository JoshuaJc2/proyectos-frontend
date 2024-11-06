import { Component } from '@angular/core';
import { ProductService } from '../../../product/_service/product.service';
import { DtoProductList } from '../../../product/_dto/dto-product-list';
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared-module';
import { DtoProductCategoryList } from '../../../product/_dto/dto-product-category-list';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../product/_service/category.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  category_id : number = -1;
  loading = false;
  products : DtoProductCategoryList[] = [];
  swal : SwalMessages = new SwalMessages
  category : string = '';

  constructor(
    private productService : ProductService,
    private route : ActivatedRoute,
    private categoryService : CategoryService
  ){}

  ngOnInit(){
    //this.category_id = this.route.snapshot.params['id']!;
    //console.log(this.category_id);
    //if(this.category_id){
    this.getProductos();
    //}
  }

  getProductos(){
    let aux = this.category_id;
    this.route.params.subscribe(par => {
      this.category_id = par['id'];
      console.log(this.category_id);
      if(aux != this.category_id){
        if(this.category_id){
          this.getProductsById();
          this.getCategory();
        }
        else{
          this.swal.errorMessage("GTIN inválido"); 
        }
      }
    });
  }

  getCategory(){
    this.loading = true;
    this.categoryService.getCategory(this.category_id).subscribe({
      next : (v) => {
        console.log(v);
        this.loading = false;
        this.category = v.category;
      },
      error : (e) => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    })
  }

  getProductsById(){
    let aux = this.category_id;
    this.loading = true;
    this.productService.getProductByCategory(this.category_id).subscribe({
      next: (v) => {
        console.log(v);
        this.loading= false;
        this.products = v.filter((value: { status: number; }) => value.status == 1);
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      } 
    });
  }

  resetVariables(){
    this.category_id = 0; 
  }
}