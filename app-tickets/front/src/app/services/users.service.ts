import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse, User } from '../interfaces/user.interface';
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

  login(user: User) {
    return lastValueFrom(
      this.httpClient.post<IResponse>(`${this.baseUrl}/login`, user)
    )
  }

  register(user: User) {
    return lastValueFrom(
      this.httpClient.post<User>(`${this.baseUrl}`, user)
    )
  }

}
