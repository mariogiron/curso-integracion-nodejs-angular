import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from '../../interfaces/ticket.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ticket-card',
  imports: [RouterLink],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css'
})
export class TicketCardComponent {

  @Input({ required: true }) ticket: Ticket | undefined;

  @Output() clickDelete: EventEmitter<number> = new EventEmitter();

  onClick() {
    this.clickDelete.emit(this.ticket?.id);
  }

}
