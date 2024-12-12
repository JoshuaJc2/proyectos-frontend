import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { SwalMessages } from '../shared/swal-messages';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  let swal: SwalMessages = new SwalMessages();
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 200) {                
            switch (error.status) {
              case 400:
                swal.errorMessage("La solicitud es incorrecta o no se puede procesar debido a un error");
                console.error('Bad Request', error.message);             
                break;
              case 401:
                console.error('Unauthorized', error.message);
                swal.errorMessage("Se requiere autenticación para acceder al recurso");
                inject(Router).navigate(['/']);
                break;
              case 403:
                console.error('Forbidden', error.message);
                swal.errorMessage("No tienes los permisos para acceder a este recurso");
                inject(Router).navigate(['/']);
                break;
              case 404:
                console.error('No encontrado', error.message);
                swal.errorMessage("El recurso solicitado no se encuentra en el servidor");
                break;
              case 500:
                console.error('Server Error', error.message);
                swal.errorMessage("El servidor ha encontrado un error inesperado que le impide cumplir con la solicitud");
                break;
              default:
                console.error(`Error inesperado: ${error.status}`, error.message);
                swal.errorMessage("Error al procesar la solicitud");
         }
         return throwError(() => error);
      }else{
        return next(req);
      }
    }
  )
  )
};
