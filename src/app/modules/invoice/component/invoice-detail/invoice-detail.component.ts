import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../_model/invoice';
import { SwalMessages } from '../../../../shared/swal-messages';
import { InvoiceService } from '../../_service/invoice.service';
import { Customer } from '../../../customer/_model/customer';
import { CustomerService } from '../../../customer/_service/customer.service';
import { SharedModule } from '../../../../shared/shared-module';
import { Item } from '../../_model/item';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {

  id: number = 0; // invoice id
  invoice: Invoice = new Invoice();
  customer : Customer = new Customer();
  rfc : String = '';
  totalitems : number = 0;
  subtotal : number = 0;
  impuestos : number = 0;
  total : number = 0;

  loading = false; // loading request
  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private invoiceService: InvoiceService,
    private customerService : CustomerService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if(this.id){
      this.getInvoice();
    }else{
      this.swal.errorMessage("El id de la factura es inválido"); 
    }
  }

  getInvoice(){
    this.loading = true;
    this.invoiceService.getInvoice(this.id).subscribe({
      next: (v) => {
        this.invoice = v;
        this.loading = false;
        console.log(this.invoice);
        this.rfc = this.invoice.rfc;
        this.getCustomer(this.rfc);
        this.calcularTotalItem(this.invoice.items);
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      }
    });
  }

  getCustomer(rfc : String){
    this.customerService.getCustomer(rfc).subscribe({
      next : (v) => {
        console.log(v);
        this.customer = v;
      },
      error : (e) => {
        console.log(e);
      }
    });
  }

  calcularTotalItem(items : Item[]){
    this.totalitems = 0;
    this.subtotal = 0;
    this.impuestos = 0;
    this.total = 0;
    items.forEach(item => {
      this.totalitems += item.quantity;
      this.subtotal += item.subtotal;
      this.impuestos += item.taxes;
      this.total += item.total;
    });
  }
}
