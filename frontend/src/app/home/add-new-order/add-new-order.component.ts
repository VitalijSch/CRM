import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeService } from '../../services/home/home.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-add-new-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-order.component.html',
  styleUrl: './add-new-order.component.css'
})
export class AddNewOrderComponent {
  public orderForm: FormGroup;

  public homeService: HomeService = inject(HomeService);
  public router: Router = inject(Router);

  private fb: FormBuilder = inject(FormBuilder);
  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.orderForm = this.fb.group({
      product: ['', Validators.required],
      quantity: [0, Validators.required],
      customer: ['', Validators.required],
    });
  }

  public createNewOrder(): void {
    let amount = this.homeService.products().find(product => product.product === this.orderForm.get('product')?.value)
    let order = {
      product: this.orderForm.get('product')?.value,
      quantity: this.orderForm.get('quantity')?.value,
      amount: amount?.price,
      customer: this.orderForm.get('customer')?.value,
    }
    console.log(order)
    this.apiService.createOrder(order).subscribe({
      next: (newOrder) => {
        this.orderForm.reset();
        this.homeService.orders.update(orders => [...orders, newOrder]);
      },
      error: (error) => {
        console.error('Fehler beim Erstellen der Notiz:', error);
      }
    });
  }
}
