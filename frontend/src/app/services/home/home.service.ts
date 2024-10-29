import { inject, Injectable, signal } from '@angular/core';
import { Customer } from '../../interfaces/customer';
import { ApiService } from '../api/api.service';
import { Order } from '../../interfaces/order';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public categories: string[] = [
    'Fruits and Vegetables',
    'Meat and Fish',
    'Dairy Products',
    'Bakery',
    'Snacks'
  ];

  public customers = signal<Customer[]>([]);
  public orders = signal<Order[]>([]);
  public products = signal<Product[]>([]);
  public filteredArray: any[] = [];

  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.getCustomers();
    // this.getOrders();
    this.getProducts();
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

  public getProducts() {
    this.apiService.getProducts().subscribe({
      next: (data: any) => {
        this.products.set(data);
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Notizen:', error);
      }
    });
  }
}
