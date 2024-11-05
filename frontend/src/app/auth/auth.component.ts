import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  public router:Router = inject(Router);

  public ngOnInit(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
  }

  public getAuthTitle(): string {
    let currentURL = this.router.url;
    if(currentURL.includes('sign-in')) {
      return 'Welcome back!';
    }
    return 'Get Started Now';
  }
}
