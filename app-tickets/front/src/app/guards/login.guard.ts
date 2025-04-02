import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const loginGuard: CanActivateFn = async (route, state) => {
  //quiero comprobar si usuario se logado correctamente
  //console.log('paso por el guard')
  const router = inject(Router);
  if (!localStorage.getItem('tokencito')) {
    let respuesta = await Swal.fire({
      title: 'Error!',
      text: 'No tienes permiso para acceder a esta página',
      icon: 'error',
      confirmButtonText: 'Salir'
    })
    if (respuesta.value) {
      router.navigate(['/login'])
      //redirigir a login
    }
    return false;
  }

  return true;
};
