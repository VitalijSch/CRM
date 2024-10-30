import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-add-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-customer.component.html',
  styleUrl: './add-new-customer.component.css'
})
export class AddNewCustomerComponent {
  public emailExist: boolean = false;
  public customerForm: FormGroup;

  public router: Router = inject(Router);

  private fb: FormBuilder = inject(FormBuilder);
  private apiService: ApiService = inject(ApiService);
  private homeService: HomeService = inject(HomeService);

  constructor() {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[+0-9]*$')]],
    });
  }

  public createNewCustomer(): void {
    this.apiService.createCustomer(this.customerForm.value).subscribe({
      next: (newCustomer) => {
        this.customerForm.reset();
        this.homeService.customers.update(customers => [...customers, newCustomer]);
        this.router.navigate(['/home/customer']);
      },
      error: (error) => {
        this.emailExist = true;
        console.error('Fehler beim Erstellen der Notiz:', error);
      }
    });
  }
}
