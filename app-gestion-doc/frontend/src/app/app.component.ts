import { Component } from '@angular/core';
import { DocumentManagerComponent } from "./components/document-manager/document-manager.component";

@Component({
  selector: 'app-root',
  imports: [DocumentManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
