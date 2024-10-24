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
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public signInAsUser(): void {
    this.apiService.login(this.userForm.value).subscribe({
      next: (response: any) => {
        console.log(response.profile_image)
        this.sidebarService.userData.username = response.username;
        this.sidebarService.userData.profileImage = response.profile_image;
        localStorage.setItem('accessToken', response.access);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login-Fehler:', error);
      }
    });
  }
}
