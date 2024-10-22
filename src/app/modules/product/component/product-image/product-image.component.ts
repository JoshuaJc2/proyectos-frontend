import { Component } from '@angular/core';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductService } from '../../_service/product.service';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../../shared/swal-messages';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})
export class ProductImageComponent {
  gtin : string = ""; // Product gtin
  product : Product = new Product();
  productImages : ProductImage[] = [];

  loading = false;
  swal : SwalMessages = new SwalMessages();
  
  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private productImageService : ProductImageService,
    private ngxService : NgxPhotoEditorService,
    private router : Router,
  ){ }

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin')!;
    if(this.gtin){
      this.getProduct();
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

  redirect(url : String){
    this.router.navigate([url]);
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
}
