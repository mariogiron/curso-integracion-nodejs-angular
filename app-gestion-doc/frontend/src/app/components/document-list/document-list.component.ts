import { Component } from '@angular/core';
import { DocumentCardComponent } from '../document-card/document-card.component';

@Component({
  selector: 'app-document-list',
  imports: [DocumentCardComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

}
