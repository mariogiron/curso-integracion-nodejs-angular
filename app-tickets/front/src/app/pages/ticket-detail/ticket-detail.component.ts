import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { Ticket } from '../../interfaces/ticket.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-detail',
  imports: [RouterLink],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent {

  @Input() ticketId: number | undefined;

  ticketData: Ticket | undefined;

  ticketsService = inject(TicketsService);
  router = inject(Router);

  async ngOnInit() {
    if (this.ticketId) {
      try {
        this.ticketData = await this.ticketsService.getById(this.ticketId);
      } catch ({ error }: any) {
        console.log(error.message);
      }
    }
  }

  async onEliminar() {
    const result = await Swal.fire({
      title: 'Borrado Ticket', text: 'Vas a borrar el ticket. ¿Seguro?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Bórralo'
    });

    if (result.isConfirmed) {
      const response = await this.ticketsService.deleteById(this.ticketId!);
      this.router.navigateByUrl('/tickets');
    }
  }

}
