import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-edit-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css'
})
export class EditTicketComponent {

  @Input() ticketId: string = '';

  ticketsService = inject(TicketsService);
  usersService = inject(UsersService);
  router = inject(Router);

  editForm: FormGroup;
  arrUsers: User[] = [];

  constructor() {
    this.editForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      created_by: new FormControl(),
      assigned_to: new FormControl()
    });
  }

  async ngOnInit() {
    // Recuperar usuarios para el select del formulario
    this.arrUsers = await this.usersService.getAll();

    // Recuperar los datos del ticket
    const ticket = await this.ticketsService.getById(Number(this.ticketId));

    // Rellenar los campos del formulario con esos datos
    // this.editForm.get('title')?.setValue(ticket.title);
    // this.editForm.get('description')?.setValue(ticket.description);
    // this.editForm.get('created_by')?.setValue(ticket.created_by);

    // const { title, description, created_by } = ticket;
    // this.editForm.setValue({
    //   title, description, created_by
    // });

    this.editForm.patchValue(ticket);
  }

  async onSubmit() {

    try {
      const ticket = await this.ticketsService.updateById(Number(this.ticketId), this.editForm.value);
      await Swal.fire({
        title: 'Edición correcta', text: 'Se ha editado el ticket', icon: 'success'
      });
      this.router.navigate(['/tickets', ticket.id]);
    } catch (error) {
      console.log(error);
    }
  }

}
