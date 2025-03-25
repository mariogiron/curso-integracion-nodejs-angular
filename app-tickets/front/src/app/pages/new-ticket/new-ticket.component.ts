import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

  newTicketForm: FormGroup;

  constructor() {
    this.newTicketForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null, [Validators.required]),
      created_by: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.newTicketForm.valid) {
      console.log(this.newTicketForm.value);
    }
  }

  // TODO: Recuperar los usuarios y colocarlos en un SELECT

}
