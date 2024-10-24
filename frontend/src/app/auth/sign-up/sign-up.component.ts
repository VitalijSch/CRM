import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';

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
  public selectedFile: File | null = null;
  public previewUrl: string | ArrayBuffer | null = null;

  public fb: FormBuilder = inject(FormBuilder);

  private apiService: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  constructor() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      profileImage: ['', [Validators.required]],
      checkbox: [false, Validators.requiredTrue]
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
      const formData = new FormData();
      formData.append('username', this.userForm.get('username')?.value);
      formData.append('email', this.userForm.get('email')?.value);
      formData.append('password', this.userForm.get('password')?.value);
      if (this.selectedFile) {
        formData.append('profile_image', this.selectedFile);
      }
      this.addUser(formData);
    }
  }

  public addUser(formData: FormData): void {
    this.apiService.registerUser(formData).subscribe({
      next: () => {
        this.userForm.reset();
        this.selectedFile = null;
        this.previewUrl = null;
        this.router.navigate(['auth/sign-in']);
      },
      error: (error) => {
        console.error('Registrierungsfehler:', error);
      }
    });
  }

  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
