import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { SidebarService } from '../../services/home/sidebar/sidebar.service';

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

  public fb: FormBuilder = inject(FormBuilder);
  public router: Router = inject(Router);

  private apiService: ApiService = inject(ApiService);
  private sidebarService: SidebarService = inject(SidebarService);

  constructor() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('user');
    if (userId) {
      this.apiService.getUserById(userId).subscribe(
        response => {
          console.log(response)
          this.userForm.patchValue({
            email: response.email,
            password: response.password, // Passwort sollte normalerweise nicht direkt zurückgegeben werden
            rememberMe: response.remember_me
          });
        },
        error => {
          console.error('Fehler beim Abrufen der Benutzerdaten:', error);
        }
      );
    }
  }

  public signInAsUser(): void {
    const user = this.userForm.value;
    if (this.userForm.get('rememberMe')?.value) {
      user.rememberMe = true;
    }
    this.apiService.getUsers(user).subscribe(
      response => {
        console.log(response)
        if (response.remember_me) {
          localStorage.setItem('user', response.id)
        } else {
          localStorage.removeItem('user');
        }
        this.sidebarService.userData.name = response.name;
        this.sidebarService.userData.userProfile = response.user_profile;
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
