import { Component } from '@angular/core';
import { DocumentManagerComponent } from "./components/document-manager/document-manager.component";
import { NgxSonnerToaster } from 'ngx-sonner';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [DocumentManagerComponent, NgxSonnerToaster, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
