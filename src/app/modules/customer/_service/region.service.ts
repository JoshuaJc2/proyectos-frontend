import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_dwb_uri } from '../../../shared/api-dwb-uri';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private source = '/region'

  constructor(
    private http : HttpClient
  ) { }

  disableRegion(id : number) : Observable<any>{
    return this.http.delete(api_dwb_uri + this.source + "/" + id);
  }

  enableRegion(id : number) : Observable<any>{
    return this.http.put(api_dwb_uri + this.source + "/" + id + "/activate", null);
  }

  createRegion(region : any) : Observable<any>{
    return this.http.post(api_dwb_uri + this.source,region);
  }

  getRegions() : Observable<any>{
    return this.http.get(api_dwb_uri + this.source);
  }

  getRegion(id : number) : Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/" + id);
  }

  getActivateRegions() : Observable<any> {
    return this.http.get(api_dwb_uri + this.source + "/activate");
  }

  updateRegion(region : any, id : number) : Observable<any> {
    return this.http.put(api_dwb_uri + this.source + "/" + id, region);
  }
}
