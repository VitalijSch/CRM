import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Customer } from '../../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string | null = null;

  private apiUrl: string = 'http://127.0.0.1:8000/api';

  private http: HttpClient = inject(HttpClient);

  public setToken(token: string) {
    this.token = token;
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/refresh/`, { refresh: refreshToken });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
  }

  public registerUser(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register/`, data);
  }

  public login(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login/`, data);
  }

  public getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers/`, { headers: this.getHeaders() });
  }

  public createCustomer(customer: Customer): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers/`, customer, { headers: this.getHeaders() });
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/customers/delete/${id}/`, { headers: this.getHeaders() });
  }
}
