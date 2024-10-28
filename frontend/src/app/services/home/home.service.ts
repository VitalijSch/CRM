import { inject, Injectable, signal } from '@angular/core';
import { Customer } from '../../interfaces/customer';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public customers = signal<Customer[]>([]);

  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.getCustomers();
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
}
