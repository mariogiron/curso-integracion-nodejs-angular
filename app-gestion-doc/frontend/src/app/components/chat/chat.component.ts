import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chat } from '../../interfaces/chat.interface';
import { toast } from 'ngx-sonner';

type initData = {
  arrMessages: Chat[];
}
@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  socket = io(environment.baseUrl);
  arrMessages: any[] = [];
  numberClientes: number = 0
  chatForm: FormGroup = new FormGroup({
    name: new FormControl("", [
      Validators.required
    ]),
    message: new FormControl("", [
      Validators.required
    ])
  }, [])

  ngOnInit() {
    this.socket.on('chat_message_server', (data: Chat) => {
      //se ejecuta cada vez que el servidor emita un mensaje de otro usuario
      this.arrMessages.push(data);
    })

    this.socket.on('number_users', (count: number) => {
      this.numberClientes = count
    })

    //capturamos el evento de inicio de chat
    this.socket.on('iniciar_chat', (initData: initData) => {
      this.arrMessages = initData.arrMessages.reverse();
    })
  }

  ngAfterViewChecked() {
    //esperamos a que la vista haya pintado todos los elementos de chat nuevos para mover el scroll a su punto inferior.
    const chatContainer = document.querySelector('.chat .list-unstyled')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  getMessage() {
    if (this.chatForm.valid) {
      this.chatForm.value.socketId = this.socket.id;
      console.log(this.chatForm.value);
      this.socket.emit('chat_message', this.chatForm.value)
      this.chatForm.get('message')?.reset()
    } else {
      toast.error('Debes rellenar todos los campos de chat')
    }
  }


}
