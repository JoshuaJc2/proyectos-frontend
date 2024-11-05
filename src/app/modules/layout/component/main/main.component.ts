import { Component } from '@angular/core';
import { ProductComponent } from '../../../product/component/product/product.component';
import { ProductService } from '../../../product/_service/product.service';
import { CategoryService } from '../../../product/_service/category.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  category_id : number = 0;

  constructor(
    private productos : ProductComponent,
    private productService : ProductService,
    private categoryService : CategoryService
  ){}

  ngOnInit(){
    this.getProductosPorCategoria();
  }

  getProductosPorCategoria(){

  }
}
