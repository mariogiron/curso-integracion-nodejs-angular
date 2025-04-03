import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse, User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

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

  getUserRolFromToken(): any {
    const token = localStorage.getItem('tokencito');
    console.log(token)
    if (!token) return null

    try {
      //Decodificamos. jwt-decode
      const decoded = jwtDecode(token);
      return decoded || null
    } catch (error) {
      console.log('token invalido', error)
      return null;
    }

  }

  getUserRolFromToken2(): any {

    const token = localStorage.getItem('tokencito');
    if (!token) return null

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload || null
    } catch (error) {
      console.log('Error al decodificar el token')
      return null;
    }

  }


}
