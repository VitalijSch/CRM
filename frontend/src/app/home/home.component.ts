import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderService } from '../services/home/header/header.service';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../services/home/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public search!: string;
  public showSearchfield: boolean = false;

  public headerService: HeaderService = inject(HeaderService);
  public router: Router = inject(Router);

  private homeService: HomeService = inject(HomeService);

  public ngOnInit(): void {
    this.checkAccessTokenIsExist();
  }

  private checkAccessTokenIsExist(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.router.navigate(['/auth/sign-in']);
    }
  }

  public navigateToAddNewComponent(): void {
    if (this.router.url.endsWith('customer')) {
      this.router.navigate(['/home/add-new-customer']);
    } else if (this.router.url.endsWith('order')) {
      this.router.navigate(['/home/add-new-order']);
    } else {
      this.router.navigate(['/home/add-new-product']);
    }
  }

  public toggleShowSearchfield(): void {
    this.showSearchfield = !this.showSearchfield;
    if (!this.showSearchfield) {
      this.search = '';
    }
  }

  public handleSearch(): void {
    if (this.router.url.endsWith('/customer')) {
      this.homeService.filteredArray = this.homeService.customers().filter(item =>
        item.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(this.search.toLowerCase()) ||
        item.email.toLowerCase().includes(this.search.toLowerCase()) ||
        item.mobile.toLowerCase().includes(this.search.toLowerCase())
      );
    } else if (this.router.url.endsWith('/product')) {
      this.homeService.filteredArray = this.homeService.products().filter(item =>
        item.product.toLowerCase().includes(this.search.toLowerCase()) ||
        item.category.toLowerCase().includes(this.search.toLowerCase()) ||
        item.price.toLowerCase().includes(this.search.toLowerCase()) ||
        String(item.total_in_stock).toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.homeService.filteredArray = this.homeService.orders().filter(item =>
        item.product.toLowerCase().includes(this.search.toLowerCase()) ||
        String(item.quantity).toLowerCase().includes(this.search.toLowerCase()) ||
        item.customer.toLowerCase().includes(this.search.toLowerCase()) ||
        String(item.order_date).toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
}
