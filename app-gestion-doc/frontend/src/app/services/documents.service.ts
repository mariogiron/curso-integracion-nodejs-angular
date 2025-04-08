import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private httpClient = inject(HttpClient);
  private endPoint = environment.apiUrl + '/documents';

  uploadDocument(formData: FormData) {
    return lastValueFrom(this.httpClient.post<any>(this.endPoint, formData))
  }

  getAll() {
    return lastValueFrom(this.httpClient.get<Document[]>(this.endPoint))
  }

  deleteDocument(_id: string | undefined) {
    return lastValueFrom(this.httpClient.delete<any>(`${this.endPoint}/${_id}`))
  }
}
