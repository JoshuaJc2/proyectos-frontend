import { Component } from '@angular/core';
import { DtoProductList } from '../../../product/_dto/dto-product-list';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductService } from '../../../product/_service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared-module';
import { CategoryService } from '../../../product/_service/category.service';
import { Category } from '../../../product/_model/category';
import { DtoProductCategoryList } from '../../../product/_dto/dto-product-category-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading = false;
  products : DtoProductCategoryList[] = [];
  categories : Category [] = [];
  swal : SwalMessages = new SwalMessages();

  constructor(
    private productService : ProductService,
    private router : Router,
    private categoryService : CategoryService
  ){}

  ngOnInit(){
    this.getCategories();
  }

  getCategories(){
    this.loading = true;
    this.categoryService.getActiveCategories().subscribe({
      next : v => {
        this.categories = v;
        this.loading = false;
        console.log(this.categories);
        this.categories.forEach(category => this.getProductosByCategory(category.category_id));
      },
      error : e => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProductosByCategory(category_id : number){
    this.loading = true;
    this.productService.getProductByCategory(category_id).subscribe({
      next: (v) => {
        this.loading= false;
        this.products = [... this.products, ... v.filter((value: { status: number; }) => value.status == 1)];
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      } 
    });
  }

  showProductDetail(gtin : String){
    this.router.navigate(['producto/' + gtin]);
  }
}
