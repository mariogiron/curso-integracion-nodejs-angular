import { Component, inject, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/ticket.interface';
import { TicketCardComponent } from "../../components/ticket-card/ticket-card.component";

@Component({
  selector: 'app-ticket-list',
  imports: [TicketCardComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {

  arrTickets: Ticket[] = [];

  // Inyectamos servicio
  ticketsService = inject(TicketsService);

  async ngOnInit() {
    // Ejecutar el método del servicio para recuperar los tickets
    try {
      this.arrTickets = await this.ticketsService.getAll();
    } catch ({ error }: any) {
      console.log(error.message);
    }
  }

  filterOpenTickets() {
    return this.arrTickets.filter(item => item.status === 'open');
  }

  async onClickDelete($event: number) {
    await this.ticketsService.deleteById($event);
    // this.arrTickets = await this.ticketsService.getAll();
    this.arrTickets = this.arrTickets.filter(ticket => ticket.id !== $event);
  }

}
