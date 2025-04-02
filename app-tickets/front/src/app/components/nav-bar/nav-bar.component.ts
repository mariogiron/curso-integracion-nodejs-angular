import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  router = inject(Router);
  onLogOut() {
    //borrar el token del localstorage y redirigir a la pagina de login
    localStorage.removeItem('tokencito');
    this.router.navigate(['/login']);
  }
}
