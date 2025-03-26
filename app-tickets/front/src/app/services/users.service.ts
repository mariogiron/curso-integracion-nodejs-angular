import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = `${environment.apiUrl}/users`;
  private httpClient = inject(HttpClient);

  getAll() {
    return lastValueFrom(
      this.httpClient.get<User[]>(this.baseUrl)
    )
  }

}
