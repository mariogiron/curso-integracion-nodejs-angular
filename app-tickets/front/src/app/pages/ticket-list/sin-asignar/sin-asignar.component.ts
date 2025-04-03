import { Component, inject } from '@angular/core';
import { Ticket } from '../../../interfaces/ticket.interface';
import { TicketsService } from '../../../services/tickets.service';
import { TicketCardComponent } from '../../../components/ticket-card/ticket-card.component';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sin-asignar',
  imports: [TicketCardComponent, RouterLink],
  templateUrl: './sin-asignar.component.html',
  styleUrl: './sin-asignar.component.css'
})
export class SinAsignarComponent {

  arrTickets: Ticket[] = [];
  userLogged: any;
  // Inyectamos servicio
  ticketsService = inject(TicketsService);
  usersService = inject(UsersService);
  router = inject(Router);

  async ngOnInit() {

    this.userLogged = this.usersService.getUserRolFromToken2()
    console.log(this.userLogged)
    // Ejecutar el método del servicio para recuperar los tickets
    try {
      if (this.userLogged.userRol === 'admin') {
        this.arrTickets = await this.ticketsService.getAllWithoutAssigned();
      } else if (this.userLogged.userRol === 'editor') {

        this.arrTickets = await this.ticketsService.getTicketsById(this.userLogged.userId)
        console.log(this.arrTickets)
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
