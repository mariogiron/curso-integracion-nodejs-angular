import { Component, inject } from '@angular/core';
import { Ticket } from '../../../interfaces/ticket.interface';
import { TicketsService } from '../../../services/tickets.service';
import { TicketCardComponent } from '../../../components/ticket-card/ticket-card.component';

@Component({
  selector: 'app-sin-asignar',
  imports: [TicketCardComponent],
  templateUrl: './sin-asignar.component.html',
  styleUrl: './sin-asignar.component.css'
})
export class SinAsignarComponent {

  arrTickets: Ticket[] = [];

  // Inyectamos servicio
  ticketsService = inject(TicketsService);

  async ngOnInit() {
    // Ejecutar el método del servicio para recuperar los tickets
    try {
      this.arrTickets = await this.ticketsService.getAllWithoutAssigned();
    } catch ({ error }: any) {
      console.log(error.message);
      console.log(error.code)
    }
  }

  async onClickDelete($event: number) {
    await this.ticketsService.deleteById($event);
    // this.arrTickets = await this.ticketsService.getAll();
    this.arrTickets = this.arrTickets.filter(ticket => ticket.id !== $event);
  }

}
