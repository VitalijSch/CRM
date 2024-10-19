import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-with-social',
  standalone: true,
  imports: [],
  templateUrl: './sign-in-with-social.component.html',
  styleUrl: './sign-in-with-social.component.css'
})
export class SignInWithSocialComponent {
  public router:Router = inject(Router);
}
