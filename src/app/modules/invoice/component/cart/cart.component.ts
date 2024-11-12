import { Component } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { Cart } from '../../_model/cart';
import { SharedModule } from '../../../../shared/shared-module';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  loading = false;
  cart : Cart[] = [];
  swal : SwalMessages = new SwalMessages();
  total : number = 0;

  constructor(
    private cartService : CartService,
    private invoiceService : InvoiceService
  ){}

  ngOnInit(){
    this.getCart();
  }

  getCart(){
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (v) => {
        console.log(v);
        this.cart = v;
        //this.total = 0;
        this.cart.forEach(item => {
          this.total += item.product.price * item.quantity;
        });
        this.loading= false;
        console.log(this.total);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
        this.loading = false;
      }
    });
  }

  clearCart(){
    this.swal.confirmMessage.fire({
      title : "¿Está seguro que quiere vaciar el carrito?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage(v.message);
            this.getCart();
            this.total = 0;
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  removeFromCart(id : number) {
    this.swal.confirmMessage.fire({
      title : "¿Está seguro que quiere quitar el producto?",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(id).subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage(v.message);
            this.total = 0;
            this.getCart();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }

  generateInvoice(){
    this.swal.confirmMessage.fire({
      title : "Favor de confirmar la compra",
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.generateInvoice().subscribe({
          next : (v) => {
            console.log(v);
            this.swal.successMessage(v.message);
            this.total = 0;
            this.getCart();
          },
          error : (e) =>{
            console.log(e);
            this.swal.errorMessage(e.error!.message);
          }
        });
      }
    });
  }
}
