import { Component, inject } from '@angular/core';
import { Ticket } from '../../../interfaces/ticket.interface';
import { TicketsService } from '../../../services/tickets.service';
import { TicketCardComponent } from '../../../components/ticket-card/ticket-card.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-asignados',
  imports: [TicketCardComponent],
  templateUrl: './asignados.component.html',
  styleUrl: './asignados.component.css'
})
export class AsignadosComponent {
  arrTickets: Ticket[] = [];
  router = inject(Router);
  userLogged: any;


  // Inyectamos servicio
  ticketsService = inject(TicketsService);
  usersService = inject(UsersService);

  async ngOnInit() {
    // Ejecutar el método del servicio para recuperar los tickets
    this.userLogged = this.usersService.getUserRolFromToken2()
    try {
      if (this.userLogged.userRol === 'admin') {
        this.arrTickets = await this.ticketsService.getAllWithAssigned();
      } else if (this.userLogged.userRol === 'editor') {
        this.arrTickets = await this.ticketsService.getTicketsById(this.userLogged.userId)
      }
    } catch ({ error }: any) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      if (error.code === 1) {
        localStorage.removeItem('tokencito');
        this.router.navigate(['/login'])
      }
    }
  }

  async onClickDelete($event: number) {
    await this.ticketsService.deleteById($event);
    // this.arrTickets = await this.ticketsService.getAll();
    this.arrTickets = this.arrTickets.filter(ticket => ticket.id !== $event);
  }
}
