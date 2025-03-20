import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';

export const routes: Routes = [
    { path: 'tickets', component: TicketListComponent }
];

// TODO: Children routes layout