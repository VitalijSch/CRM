import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  private http: HttpClient = inject(HttpClient);

  public getUsers(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, user);
  }

  public createUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}users/`, formData);
  }

  public getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}users/${userId}/`);
  }
}
