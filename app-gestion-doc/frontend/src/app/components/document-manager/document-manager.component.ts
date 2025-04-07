import { Component } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { DocumentListComponent } from "../document-list/document-list.component";

@Component({
  selector: 'app-document-manager',
  imports: [FormComponent, DocumentListComponent],
  templateUrl: './document-manager.component.html',
  styleUrl: './document-manager.component.css'
})
export class DocumentManagerComponent {

}
