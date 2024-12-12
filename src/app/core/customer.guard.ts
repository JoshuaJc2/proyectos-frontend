import { CanActivateFn, Router } from '@angular/router';
import { SwalMessages } from '../shared/swal-messages';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
  let swal: SwalMessages = new SwalMessages();
  
  if(localStorage.getItem("user")){
    //let user = JSON.parse(localStorage.getItem("user")!);
    //if(user.rol == "USER"){
      //return true;
    //}
    return true;
  }

  inject(Router).navigate(['/']);
  swal.errorMessage("No tienes los permisos para acceder a esta página");
  return false;
};
