import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  // TODO: Mover al fichero de entorno
  // https://cursocei.ngrok.io
  private baseUrl: string = 'http://localhost:3000/api/tickets';
  private httpClient = inject(HttpClient);

  getAll() {
    return lastValueFrom(
      this.httpClient.get<Ticket[]>(this.baseUrl)
    );
  }

  getById(ticketId: number) {
    return lastValueFrom(
      this.httpClient.get<Ticket>(`${this.baseUrl}/${ticketId}`)
    )
  }

}