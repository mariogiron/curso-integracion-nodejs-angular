import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { TicketsService } from '../../services/tickets.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-new-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

  newTicketForm: FormGroup;
  arrUsers: User[] = [];

  ticketsService = inject(TicketsService);
  usersService = inject(UsersService);
  router = inject(Router);

  constructor() {
    this.newTicketForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null, [Validators.required]),
      created_by: new FormControl(null, [Validators.required])
    });
  }

  async ngOnInit() {
    this.arrUsers = await this.usersService.getAll();
  }

  async onSubmit() {
    this.newTicketForm.markAllAsTouched();
    if (this.newTicketForm.valid) {
      try {
        const newTicket = await this.ticketsService.create(this.newTicketForm.value);
        this.newTicketForm.reset();
        await Swal.fire({
          title: 'Ticket creado', text: 'Se ha generado un nuevo ticket', icon: 'success'
        });
        this.router.navigate(['/tickets', newTicket.id]);
      } catch (error) {
        console.log(error);
      }

    }
  }

  checkError(controlName: string, errorName: string) {
    return this.newTicketForm.get(controlName)?.hasError(errorName) && this.newTicketForm.get(controlName)?.touched
  }

  // TODO: Recuperar los usuarios y colocarlos en un SELECT

}
