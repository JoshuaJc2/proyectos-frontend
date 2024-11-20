import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history : String[] = []
  
  constructor(private router:Router, private location:Location) {}

  public startSaveHistory(){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  public getHistory(){
    return this.history;
  }

  public goBack() {
    this.history.pop();
    
    if(this.history.length > 0){
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  public getPrevious() : String {
    if (this.history.length > 0){
      return this.history[this.history.length - 2];
    }

    return '';
  }
}
