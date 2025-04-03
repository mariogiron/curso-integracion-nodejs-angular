import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-ticket-list',
  imports: [RouterOutlet, RouterLink, NavBarComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {
  userLogged: any;
  usersService = inject(UsersService);

  ngOnInit() {
    this.userLogged = this.usersService.getUserRolFromToken2()
  }
}
