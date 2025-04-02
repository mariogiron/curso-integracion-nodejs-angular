import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { EditTicketComponent } from './pages/edit-ticket/edit-ticket.component';
import { AsignadosComponent } from './pages/ticket-list/asignados/asignados.component';
import { SinAsignarComponent } from './pages/ticket-list/sin-asignar/sin-asignar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: 'tickets', component: TicketListComponent, canActivate: [loginGuard], children: [
      { path: "", pathMatch: 'full', redirectTo: 'sin-asignar' },
      { path: 'asignados', component: AsignadosComponent },
      { path: 'sin-asignar', component: SinAsignarComponent }
    ]
  },
  { path: 'tickets/new', component: NewTicketComponent, canActivate: [loginGuard] },
  { path: 'tickets/:ticketId', component: TicketDetailComponent, canActivate: [loginGuard] },
  { path: 'tickets/edit/:ticketId', component: EditTicketComponent, canActivate: [loginGuard] }
];
// no permitir el acceso a ciertas rutas necesitamos lo que en angular se llama GUARDS - clausas de guarda.

//  /tickets/12

// TODO: Children routes layout
