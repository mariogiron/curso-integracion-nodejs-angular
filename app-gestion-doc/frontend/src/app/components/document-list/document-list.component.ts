import { Component, inject } from '@angular/core';
import { DocumentCardComponent } from '../document-card/document-card.component';
import { Document } from '../../interfaces/document.interface';
import { toast } from 'ngx-sonner';
import { DocumentsService } from '../../services/documents.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-document-list',
  imports: [DocumentCardComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  documents: Document[] = [];
  documentsService = inject(DocumentsService);

  ngOnInit() {
    this.loadDocuments()
  }

  async loadDocuments() {
    try {
      this.documents = await this.documentsService.getAll();
    } catch (err: any) {
      toast.error(err.message);
    }

  }
}
