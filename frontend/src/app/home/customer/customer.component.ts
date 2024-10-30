import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Customer } from '../../interfaces/customer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  public emailExist: boolean = false;
  public customerForm: FormGroup;
  public currentCustomer!: Customer;

  public homeService: HomeService = inject(HomeService);

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
    this.homeService.filteredArray = this.homeService.customers();
  }

  public updateCustomer(): void {
    this.updateCurrentCustomer();
    this.apiService.updateCustomer(this.currentCustomer.id, this.currentCustomer).subscribe({
      next: () => {
        this.toggleEditCustomer(this.currentCustomer.id);
        this.emailExist = false;
      },
      error: (error) => {
        this.emailExist = true;
        console.error('Fehler beim Updaten der Notiz:', error);
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
        this.homeService.customers.update(customers => customers.filter(customer => customer.id !== id));
        const index = this.homeService.filteredArray.findIndex(c => c.id === id);
        if (index !== -1) {
          this.homeService.filteredArray.splice(index, 1);
        }
      },
      error: (error) => {
        console.error('Fehler beim Löschen der Notiz:', error);
      }
    });
  }

  public setCurrentCustomer(customer: Customer): void {
    this.resetCurrentCustomer();
    this.currentCustomer = customer;
    this.homeService.customers().forEach(customer => {
      customer.is_edit = false;
    });
    this.setValuesForInputfields();
    this.toggleEditCustomer(customer.id);
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

  private toggleEditCustomer(id: number): void {
    const customer = this.homeService.customers().find(c => c.id === id);
    if (customer) {
      customer.is_edit = !customer.is_edit;
    }
  }
}
