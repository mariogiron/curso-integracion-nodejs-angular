import { Component, Input } from '@angular/core';
import { Ticket } from '../../interfaces/ticket.interface';

@Component({
  selector: 'ticket-card',
  imports: [],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css'
})
export class TicketCardComponent {

  @Input({ required: true }) ticket: Ticket | undefined;

}
