import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  public userForm: FormGroup;

  private users!: User;

  public isLoginInvalid: boolean = false;

  public fb: FormBuilder = inject(FormBuilder);
  public router: Router = inject(Router);

  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public signInAsUser(): void {
    const user = this.userForm.value;
    this.apiService.getUsers(user).subscribe(
      response => {
        console.log(response)
        this.isLoginInvalid = false;
        this.router.navigate(['home']);
      },
      error => {
        this.isLoginInvalid = true;
        setTimeout(() => {
          this.isLoginInvalid = false;
        }, 3000);
      }
    );
  }
}
