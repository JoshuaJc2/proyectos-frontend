import { Component } from '@angular/core';
import { DtoProductList } from '../../_dto/dto-product-list';
import { Category } from '../../_model/category';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { ProductImageComponent } from "../product-image/product-image.component";
import { Router } from '@angular/router';

declare var $:any; // Variable de JQuery

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule, ProductImageComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  form : FormGroup;
  products : DtoProductList [] = [];
  categories : Category[] = [];
  swal: SwalMessages = new SwalMessages(); // swal messages
  submitted = false;
  categoryUpdate:number = 0;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router : Router,
  ){
    this.form = this.formBuilder.group({
      product: ["", [Validators.required]],
      gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      description: ["", [Validators.required]],
      price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      category_id: [0, [Validators.required]],
    })
  }

  ngOnInit(){
    this.getProducts();
  }

  enableProduct(id : number){
    this.swal.confirmMessage.fire({
      title : "Favor de confirmar la activacion",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.enableProduct(id).subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage(v.message);
            this.getProducts();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  disableProduct(id : number){
    this.swal.confirmMessage.fire({
      title : "Favor de confirmar la eliminacion",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.disableProduct(id).subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage(v.message);
            this.getProducts();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  getProducts(){
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v;
        this.loading = false;
        // this.current_date = new Date();
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getActiveCategories(){
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  onSubmit(){
    // validate form
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.createProduct(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message); // show message
        this.getProducts(); // reload products
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  showModalForm(){
    $("#modalForm").modal("show");
    this.getActiveCategories();
    this.form.reset();
    this.submitted = false;
  }

  showProduct(gtin : String){
    this.router.navigate(['producto/' + gtin]);
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }
}
