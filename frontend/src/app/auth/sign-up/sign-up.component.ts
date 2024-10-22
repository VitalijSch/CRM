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
  public selectedFile: File | null = null;
  public previewUrl: string | ArrayBuffer | null = null;

  public fb: FormBuilder = inject(FormBuilder);

  private authService: AuthService = inject(AuthService);
  private apiService: ApiService = inject(ApiService);

  constructor() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      user_profile: ['', [Validators.required]],
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
      const formData = new FormData();
      formData.append('name', this.userForm.get('name')?.value);
      formData.append('email', this.userForm.get('email')?.value);
      formData.append('password', this.userForm.get('password')?.value);
      if (this.selectedFile) {
        formData.append('user_profile', this.selectedFile);
      }
      this.addUser(formData);
    }
  }

  public addUser(formData: FormData): void {
    this.apiService.createUser(formData).subscribe(person => {
      this.userForm.reset();
      this.selectedFile = null;
      this.previewUrl = null;
      console.log(person);
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
