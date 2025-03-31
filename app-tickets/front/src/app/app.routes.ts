import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { EditTicketComponent } from './pages/edit-ticket/edit-ticket.component';
import { AsignadosComponent } from './pages/ticket-list/asignados/asignados.component';
import { SinAsignarComponent } from './pages/ticket-list/sin-asignar/sin-asignar.component';

export const routes: Routes = [
  {
    path: 'tickets', component: TicketListComponent, children: [
      { path: "", pathMatch: 'full', redirectTo: 'sin-asignar' },
      { path: 'asignados', component: AsignadosComponent },
      { path: 'sin-asignar', component: SinAsignarComponent }
    ]
  },
  { path: 'tickets/new', component: NewTicketComponent },
  { path: 'tickets/:ticketId', component: TicketDetailComponent },
  { path: 'tickets/edit/:ticketId', component: EditTicketComponent }
];

//  /tickets/12

// TODO: Children routes layout
