import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  socket = io(environment.baseUrl);
  arrMessages: any[] = [];
  chatForm: FormGroup = new FormGroup({
    name: new FormControl("", [
      Validators.required
    ]),
    message: new FormControl("", [
      Validators.required
    ])
  }, [])

  ngOnInit() {
    this.socket.on('chat_message_server', (data: any) => {
      //se ejecuta cada vez que el servidor emita un mensaje de otro usuario
      this.arrMessages.push(data);
    })

  }

  getMessage() {
    this.socket.emit('chat_message', this.chatForm.value)
    this.chatForm.get('message')?.reset()
  }

}
