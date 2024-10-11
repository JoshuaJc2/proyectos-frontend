import Swal from 'sweetalert2';

export class SwalMessages{
    // muestra mensaje de confirmación
    successMessage(message: string){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            toast: true,
            text: message,
            color: '#fff',
            background: '#697565',
            showConfirmButton: false,
            timer: 2500
        });
    }
    // muestra mensaje de error
    errorMessage(message: string){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            text: message,
            background: '#F8E8F8',
            showConfirmButton: false,
            timer: 2000
        });
    }
}
