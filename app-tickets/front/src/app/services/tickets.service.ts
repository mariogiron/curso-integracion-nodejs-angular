import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket.interface';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

type BodyPost = { title: string, description: string, created_by: number };

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  // https://cursocei.ngrok.io
  private baseUrl: string = `${environment.apiUrl}/tickets`;
  private httpClient = inject(HttpClient);

  getAllWithoutAssigned() {
    return lastValueFrom(
      this.httpClient.get<Ticket[]>(this.baseUrl + "/not-assigned")
    );
  }

  getAllWithAssigned() {
    return lastValueFrom(
      this.httpClient.get<Ticket[]>(this.baseUrl + "/assigned")
    );
  }

  getById(ticketId: number) {
    return lastValueFrom(
      this.httpClient.get<Ticket>(`${this.baseUrl}/${ticketId}`)
    )
  }

  create(body: BodyPost) {
    return lastValueFrom(
      this.httpClient.post<Ticket>(this.baseUrl, body)
    );
  }

  updateById(ticketId: number, body: BodyPost) {
    return lastValueFrom(
      this.httpClient.put<Ticket>(`${this.baseUrl}/${ticketId}`, body)
    )
  }

  deleteById(ticketId: number) {
    return lastValueFrom(
      this.httpClient.delete<Ticket>(`${this.baseUrl}/${ticketId}`)
    );
  }

}
