import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Customer } from '../../interfaces/customer';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  public customers!: Customer[];

  private apiService: ApiService = inject(ApiService);

  public ngOnInit(): void {
    this.getCustomers();
  }

  private getCustomers() {
    this.apiService.getCustomers().subscribe({
      next: (data: any) => {
        this.customers = data;
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Notizen:', error);
      }
    });
  }

  public deleteCustomer(id: number): void {
    this.apiService.deleteCustomer(id).subscribe({
      next: () => {
        this.getCustomers();
      },
      error: (error) => {
        console.error('Fehler beim Löschen der Notiz:', error);
      }
    });
  }
}
