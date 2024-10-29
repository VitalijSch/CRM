import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {
  public productForm: FormGroup;

  public homeService: HomeService = inject(HomeService);
  public router: Router = inject(Router);

  private fb: FormBuilder = inject(FormBuilder);
  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      total_in_stock: [0, Validators.required],
    });
  }

  public createNewProduct(): void {
    this.apiService.createProduct(this.productForm.value).subscribe({
      next: (newProduct) => {
        this.productForm.reset();
        this.homeService.products.update(products => [...products, newProduct]);
      },
      error: (error) => {
        console.error('Fehler beim Erstellen der Notiz:', error);
      }
    });
  }
}
