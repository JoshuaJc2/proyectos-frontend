import { Component } from '@angular/core';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductService } from '../../_service/product.service';
import { Product } from '../../_model/product';
import { ProductImage } from '../../_model/product-image';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})
export class ProductImageComponent {
  gtin : String = ''; // Product gtin
  product : Product = new Product();
  productImage : ProductImage = new ProductImage();
  
  constructor(
    private route : ActivatedRoute,
    private productService : ProductService,
    private productImageService : ProductImageService,
    // private ngxService : NgxPhotoEditorService;
    private router : Router,
  ){ }

  // image 

  fileChangeHandler($event: any) {
    /*this.ngxService.open($event, {
      aspectRatio: 1 / 1,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.updateCustomerImage(data.base64!);
    });*/
  }
}
