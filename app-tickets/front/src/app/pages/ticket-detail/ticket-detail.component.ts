import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/ticket.interface';

@Component({
  selector: 'app-ticket-detail',
  imports: [],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent {

  @Input() ticketId: number | undefined;

  ticketData: Ticket | undefined;

  ticketsService = inject(TicketsService);

  async ngOnInit() {
    if (this.ticketId) {
      try {
        this.ticketData = await this.ticketsService.getById(this.ticketId);
      } catch ({ error }: any) {
        console.log(error.message);
      }
    }
  }

}
