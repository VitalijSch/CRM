import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  public passwordMatch: boolean = false;

  public userForm: FormGroup;

  public fb: FormBuilder = inject(FormBuilder);

  private authService: AuthService = inject(AuthService);
  private http: HttpClient = inject(HttpClient);

  constructor() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      checkbox: [false, Validators.requiredTrue],
    });
  }

  public handlePasswordMatch(): void {
    if (this.userForm.get('password')?.value === this.userForm.get('confirmPassword')?.value) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  public createUser(): void {
    if (this.userForm.valid && this.passwordMatch) {
      let user = this.authService.user;
      user.email = this.userForm.get('email')?.value;
      user.password = this.userForm.get('password')?.value;
      this.register(user);
    }
  }

  public register(user: User): Observable<any> {
    return this.http.post('127.0.0.1:8000//user_auth/sign-up', user);
  }
}
