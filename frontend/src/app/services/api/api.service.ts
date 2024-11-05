import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { Customer } from '../../interfaces/customer';
import { Order } from '../../interfaces/order';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string | null = null;

  private apiUrl: string = 'http://127.0.0.1:8000/api';

  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.loadToken();
  }

  public setToken(token: string) {
    this.token = token;
  }

  private loadToken() {
    this.token = localStorage.getItem('accessToken');
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

  public updateCustomer(id: number, customer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/customers/update/${id}/`, customer, { headers: this.getHeaders() });
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/customers/delete/${id}/`, { headers: this.getHeaders() });
  }

  public getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/`, { headers: this.getHeaders() });
  }

  public createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/`, order, { headers: this.getHeaders() });
  }

  public updateOrder(id: number, order: Order): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/update/${id}/`, order, { headers: this.getHeaders() });
  }

  public deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/delete/${id}/`, { headers: this.getHeaders() });
  }

  public getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/`, { headers: this.getHeaders() });
  }

  public createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/`, product, { headers: this.getHeaders() });
  }

  public updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/update/${id}/`, product, { headers: this.getHeaders() });
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/delete/${id}/`, { headers: this.getHeaders() });
  }
}
