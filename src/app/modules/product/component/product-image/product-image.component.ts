import { Component } from '@angular/core';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductService } from '../../_service/product.service';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { CartService } from '../../../invoice/_service/cart.service';
import { Cart } from '../../../invoice/_model/cart';

declare var $ : any;

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})
export class ProductImageComponent {
  gtin : string = ''; // Product gtin
  product : Product = new Product();
  categories : Category[] = [];
  productImages : ProductImage[] = [];
  cart : Cart = new Cart();
  submitted = false;
  loading = false;
  swal : SwalMessages = new SwalMessages();
  form : FormGroup;
  productUpdate : number = 0;
  loggedIn = false;
  isAdmin = false;
  quantity = 0;
  
  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private productImageService : ProductImageService,
    private categoryService : CategoryService,
    private cartService: CartService,
    private ngxService : NgxPhotoEditorService,
    private router : Router,
    private formBuilder : FormBuilder
  ){ 
    // Product form
  this.form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
  });
  }

  ngOnInit(){
    if(localStorage.getItem("token")){
      this.loggedIn = true;
    }
    if(localStorage.getItem("user")){
      let user = JSON.parse(localStorage.getItem("user")!);
      if(user.rol == "ADMIN"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    }
    
    this.gtin = this.route.snapshot.paramMap.get('gtin')!;
    if(this.gtin){
      this.getProduct();
      if(this.loggedIn ==true && this.isAdmin == false){
        this.getCart();
      }
    }else{
      this.swal.errorMessage("GTIN inválido"); 
    }
  }

  deleteProductImage(product_image_id : number){
    this.swal.confirmMessage.fire({
      title : "Favor de confirmar la eliminacion",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productImageService.deleteProductImage(product_image_id).subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage(v.message);
            this.getProductImages();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  getProduct(){
    this.loading = true;
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v;
        this.loading = false;
        console.log(this.product);
        this.getProductImages();
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    });
  }

  onSubmit(){
    // validate form
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.updateProduct(this.form.value, this.productUpdate).subscribe({
      next: (v) => {
        this.getProduct();
        this.hideModalForm();
        this.resetVariables();
        this.swal.successMessage(v.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage("No se pudo actualizar el producto");
      }
    });
  }

  // image 
  uploadProductImage(image: string){
    // creamos el objeto customer image
    let productImageC: ProductImage = new ProductImage();
    productImageC.product_id = this.product.product_id;
    productImageC.image = image;
 
    // enviamos la imagen a la API
    this.productImageService.uploadProductImage(productImageC).subscribe({
      next: (v) => {
        this.swal.successMessage(v.message);
        this.getProduct();
        this.getProductImages();
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error.message);
      }
    });
  }

  fileChangeHandler($event: any) {
    this.ngxService.open($event, {
      aspectRatio: 1 / 1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.uploadProductImage(data.base64!);
    });
  }

  redirectAdmin(url : String){
    this.router.navigate([url]);
  }

  redirect(category_id : number){
    this.router.navigate(['main/' + category_id]);
  }

  getCart(){
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (v) => {
        console.log(v);
        this.cart = v;
        this.loading= false;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
        this.loading = false;
      }
    });
  }

  getProductImages(){
    this.loading = true;
    this.productImageService.getProductImages(this.product.product_id).subscribe({
      next: (v) => {
        console.log(v);
        this.productImages = v;
        this.loading= false;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
        this.loading = false;
      }
    });
  } 
  showModalForm(){
    $("#modalForm").modal("show");
    this.getActiveCategories();
    this.form.reset();
    this.submitted = false;
  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }

  // catalogues 

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

  addToCart(cart : any){
    console.log(cart);
    if(this.loggedIn == false){
      this.swal.errorMessage("Lo sentimos, primero debe iniciar sesión o registrarse");
    } else {
      if(cart.quantity > this.product.stock || this.quantity <= 0){
        this.swal.errorMessage("Seleccione una cantidad valida")
      } else {
        this.loading = true;
        this.cartService.addToCart(cart).subscribe({
          next : (v) => {
          this.loading = false;
          this.swal.successMessage('Producto añadido correctamente');
          this.getCart();
          },
          error: (e) => {
          this.swal.errorMessage(e.error!.message);
          this.loading = false;
          }
        });
      }
    }
  }

  resetVariables(){
    this.form.reset();
    this.submitted = false;
    this.productUpdate = 0;
  }

  updateProduct(){
    this.resetVariables();
    this.showModalForm();

    this.productUpdate = this.product.product_id;
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);
  }
}
