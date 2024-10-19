import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SignInWithSocialComponent } from './sign-in-with-social/sign-in-with-social.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, SignInWithSocialComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  public router:Router = inject(Router);

  public getAuthTitle(): string {
    let currentURL = this.router.url;
    if(currentURL.includes('sign-in')) {
      return 'Welcome back!';
    }
    return 'Get Started Now';
  }
}
