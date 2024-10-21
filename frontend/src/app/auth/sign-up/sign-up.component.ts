import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api/api.service';

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
  private apiService: ApiService = inject(ApiService);


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
      this.addUser(user);
    }
  }

  public addUser(user: User): void {
    if (user) {
      this.apiService.createUser(user).subscribe(person => {
        console.log(person)
      });
    }
  }
}
