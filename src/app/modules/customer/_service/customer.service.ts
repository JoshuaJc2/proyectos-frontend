import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private source = '/customer';

  constructor(
    private http : HttpClient
  ) { }

  enableCustomer(id : number) : Observable<any>{
    return this.http.put(api_dwb_uri + this.source + "/" + id + "/activate", null);
  }

  disableCustomer(id : number) : Observable<any>{
    return this.http.delete(api_dwb_uri + this.source + "/" + id);
  }
  
  getCustomer(rfc : String) : Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + rfc);
  }

  getCustomers() : Observable<any> {
    return this.http.get(api_dwb_uri + this.source);
  }
}
