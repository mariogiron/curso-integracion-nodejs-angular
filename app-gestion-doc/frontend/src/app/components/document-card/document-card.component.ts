import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Document } from '../../interfaces/document.interface';
import { environment } from '../../../environments/environment.development';
import { toast } from 'ngx-sonner';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-document-card',
  imports: [],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.css'
})
export class DocumentCardComponent {
  @Input() document: Document | undefined;
  server: string = environment.baseUrl;
  documentsService = inject(DocumentsService)
  @Output() deleteDocumentEmitter: EventEmitter<void> = new EventEmitter()

  async deleteDoc(_id: string | undefined) {
    try {
      const response = await this.documentsService.deleteDocument(_id)
      if (response) {
        // he borrado correctamente voy a avisar al padre de que recargue la lista de documento
        this.deleteDocumentEmitter.emit()
        toast.success('Documento borrado correctamente')
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }

}
