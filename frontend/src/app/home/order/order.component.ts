import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeService } from '../../services/home/home.service';
import { ApiService } from '../../services/api/api.service';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  public orderForm: FormGroup;
  public currentOrder!: Order;

  public homeService: HomeService = inject(HomeService);

  private apiService: ApiService = inject(ApiService);
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.orderForm = this.fb.group({
      product: [{ value: '', disabled: true }],
      quantity: [0, Validators.min(1)],
      amount: [{ value: '', disabled: true }],
      customer: [{ value: '', disabled: true }],
      order_date: [{ value: null, disabled: true }]
    });
  }

  public ngOnInit(): void {
    this.homeService.filteredArray = this.homeService.orders();
  }

  public updateOrder(): void {
    this.toggleEditOrder(this.currentOrder.id);
    this.updateCurrentOrder();
    this.apiService.updateOrder(this.currentOrder.id, this.currentOrder).subscribe({
      error: (error) => {
        console.error('Fehler beim Löschen der Notiz:', error);
      }
    });
  }

  private updateCurrentOrder(): void {
    this.currentOrder.product = this.orderForm.get('product')?.value;
    this.currentOrder.quantity = this.orderForm.get('quantity')?.value;
    this.currentOrder.amount = this.orderForm.get('amount')?.value;
    this.currentOrder.customer = this.orderForm.get('customer')?.value;
    this.currentOrder.order_date = this.orderForm.get('order_date')?.value;
  }

  public deleteOrder(id: number): void {
    this.apiService.deleteOrder(id).subscribe({
      next: () => {
        this.homeService.orders.update(orders => orders.filter(order => order.id !== id));
        const index = this.homeService.filteredArray.findIndex(o => o.id === id);
        if (index !== -1) {
          this.homeService.filteredArray.splice(index, 1);
        }
      },
      error: (error) => {
        console.error('Fehler beim Löschen der Notiz:', error);
      }
    });
  }

  public setCurrentOrder(order: Order): void {
    this.resetCurrentOrder();
    this.currentOrder = order;
    this.homeService.orders().forEach(order => {
      order.is_edit = false;
    });
    this.setValuesForInputfields();
    this.toggleEditOrder(order.id);
  }

  private resetCurrentOrder(): void {
    this.currentOrder = {
      id: 0,
      product: '',
      quantity: 0,
      amount: '',
      customer: '',
      order_date: null,
      is_edit: false
    };
  }

  private setValuesForInputfields(): void {
    this.orderForm.setValue({
      product: this.currentOrder.product,
      quantity: this.currentOrder.quantity,
      amount: this.currentOrder.amount,
      customer: this.currentOrder.customer,
      order_date: this.currentOrder.order_date,
    });
  }

  private toggleEditOrder(id: number): void {
    const order = this.homeService.orders().find(o => o.id === id);
    if (order) {
      order.is_edit = !order.is_edit;
    }
  }
}
