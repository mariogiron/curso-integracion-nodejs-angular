import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { TicketListComponent } from "./pages/ticket-list/ticket-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketCardComponent, TicketListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
