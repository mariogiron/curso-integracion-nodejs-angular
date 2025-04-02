import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", []),
    password: new FormControl("", [])
  }, [])
  usersService = inject(UsersService);
  router = inject(Router);

  async getDataLogin() {
    //llamar al servicio a la funcion login y pasarle los datos del usuario.
    try {
      let respuesta = await this.usersService.login(this.loginForm.value);
      //localStorage.getItem('nombre') => obtener datos del localstorage
      //localStorage.setItem('nombre', value) => guardar datos del localstorage ✅
      //localStorage.removeItem('nombre') => borrar un elemento concreto del localstorage
      //localStorage.clear() => borrar todo el localstorage de ese dominio
      localStorage.setItem('tokencito', respuesta.token);
      // redirectTo a tickets
      this.router.navigate(['/tickets']);
    } catch (obj: any) {
      console.log(obj)
      Swal.fire({
        title: 'Error!',
        text: obj.error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }


  }
}
