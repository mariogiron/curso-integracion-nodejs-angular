import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TicketCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
