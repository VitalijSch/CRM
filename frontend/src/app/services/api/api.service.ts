import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string | null = null;
  private apiUrl = 'http://127.0.0.1:8000/api';

  private http: HttpClient = inject(HttpClient);

  public setToken(token: string): void {
    this.token = token;
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/refresh/`, { refresh: refreshToken });
  }

  public registerUser(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register/`, data);
  }

  public login(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, data);
  }
}
