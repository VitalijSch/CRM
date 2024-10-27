import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Customer } from '../../interfaces/customer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  public customerForm: FormGroup;
  public customers!: Customer[];
  public currentCustomer!: Customer;

  private apiService: ApiService = inject(ApiService);
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[+0-9]*$')]],
    });
  }

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

  public updateCustomer(): void {
    let indexOfCustomer = this.customers.indexOf(this.currentCustomer);
    this.toggleEditCustomer(indexOfCustomer);
    this.updateCurrentCustomer();
    this.apiService.updateCustomer(this.currentCustomer.id, this.currentCustomer).subscribe({
      next: () => {
        this.getCustomers();
      },
      error: (error) => {
        console.error('Fehler beim Löschen der Notiz:', error);
      }
    });
  }

  private updateCurrentCustomer(): void {
    this.currentCustomer.first_name = this.customerForm.get('first_name')?.value;
    this.currentCustomer.last_name = this.customerForm.get('last_name')?.value;
    this.currentCustomer.email = this.customerForm.get('email')?.value;
    this.currentCustomer.mobile = this.customerForm.get('mobile')?.value;
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

  public setCurrentCustomer(index: number, customer: Customer): void {
    this.resetCurrentCustomer();
    this.currentCustomer = customer;
    this.customers.forEach(customer => {
      customer.is_edit = false;
    });
    this.setValuesForInputfields();
    this.toggleEditCustomer(index);
  }

  private resetCurrentCustomer(): void {
    this.currentCustomer = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      is_edit: false
    };
  }

  private setValuesForInputfields(): void {
    this.customerForm.setValue({
      first_name: this.currentCustomer.first_name,
      last_name: this.currentCustomer.last_name,
      email: this.currentCustomer.email,
      mobile: this.currentCustomer.mobile,
    });
  }

  public toggleEditCustomer(index: number): void {
    this.customers[index].is_edit = !this.customers[index].is_edit;
  }
}
