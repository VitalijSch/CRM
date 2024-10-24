import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderService } from '../services/home/header/header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public headerService: HeaderService = inject(HeaderService);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    this.checkAccessTokenIsExist();
  }

  private checkAccessTokenIsExist(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.router.navigate(['/auth/sign-in']);
    }
  }
}
