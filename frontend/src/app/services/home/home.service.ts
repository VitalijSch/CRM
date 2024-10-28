import { inject, Injectable, signal } from '@angular/core';
import { Customer } from '../../interfaces/customer';
import { ApiService } from '../api/api.service';
import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public customers = signal<Customer[]>([]);
  public orders = signal<Order[]>([]);
  public filteredArray: any[] = [];

  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.getCustomers();
    this.getOrders();
  }

  public getCustomers() {
    this.apiService.getCustomers().subscribe({
      next: (data: any) => {
        this.customers.set(data);
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Notizen:', error);
      }
    });
  }

  public getOrders() {
    this.apiService.getOrders().subscribe({
      next: (data: any) => {
        this.orders.set(data);
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Notizen:', error);
      }
    });
  }
}
