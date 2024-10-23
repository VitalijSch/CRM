import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User = {
    name: '',
    email: '',
    password: '',
    userProfile: null,
    rememberMe: false
  }

  public resetUser(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      userProfile: null,
      rememberMe: false
    }
  }
}
