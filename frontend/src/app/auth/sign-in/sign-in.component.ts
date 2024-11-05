import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  public userForm: FormGroup;

  public isLoginInvalid: boolean = false;

  public router: Router = inject(Router);

  private fb: FormBuilder = inject(FormBuilder);
  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public signInAsUser(): void {
    this.apiService.login(this.userForm.value).subscribe({
      next: (response: any) => {
        let userData = {
          username: response.username,
          profile_image: response.profile_image
        }
        this.apiService.setToken(response.access);
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('userData', JSON.stringify(userData));
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login-Fehler:', error);
      }
    });
  }
}
