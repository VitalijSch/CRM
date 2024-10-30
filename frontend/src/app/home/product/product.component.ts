import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeService } from '../../services/home/home.service';
import { ApiService } from '../../services/api/api.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  public productForm: FormGroup;
  public currentProduct!: Product;

  public homeService: HomeService = inject(HomeService);

  private apiService: ApiService = inject(ApiService);
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      total_in_stock: [0, Validators.required],
    });
  }

  public ngOnInit(): void {
    this.homeService.filteredArray = this.homeService.products();
  }

  public updateProduct(): void {
    this.toggleEditProduct(this.currentProduct.id);
    this.updateCurrentProduct();
    this.apiService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe({
      error: (error) => {
        console.error('Fehler beim Löschen der Notiz:', error);
      }
    });
  }

  private updateCurrentProduct(): void {
    this.currentProduct.product = this.productForm.get('product')?.value;
    this.currentProduct.category = this.productForm.get('category')?.value;
    this.currentProduct.price = this.productForm.get('price')?.value;
    this.currentProduct.total_in_stock = this.productForm.get('total_in_stock')?.value;
  }

  public deleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.homeService.products.update(products => products.filter(product => product.id !== id));
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

  public setCurrentProduct(product: Product): void {
    this.resetCurrentProduct();
    this.currentProduct = product;
    this.homeService.products().forEach(product => {
      product.is_edit = false;
    });
    this.setValuesForInputfields();
    this.toggleEditProduct(product.id);
  }

  private resetCurrentProduct(): void {
    this.currentProduct = {
      id: 0,
      product: '',
      category: '',
      price: '',
      total_in_stock: 0,
      is_edit: false
    };
  }

  private setValuesForInputfields(): void {
    this.productForm.setValue({
      product: this.currentProduct.product,
      category: this.currentProduct.category,
      price: this.currentProduct.price,
      total_in_stock: this.currentProduct.total_in_stock,
    });
  }

  private toggleEditProduct(id: number): void {
    const product = this.homeService.products().find(p => p.id === id);
    if (product) {
      product.is_edit = !product.is_edit;
    }
  }

  public replaceDotWithComma(price: number): string {
    let priceWithComma = String(price.toFixed(2)).replace('.', ',');
    return priceWithComma;
  }
}
