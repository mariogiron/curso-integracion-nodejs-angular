import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';

export const routes: Routes = [
    { path: 'tickets', component: TicketListComponent },
    { path: 'tickets/new', component: NewTicketComponent },
    { path: 'tickets/:ticketId', component: TicketDetailComponent },
];

//  /tickets/12

// TODO: Children routes layout