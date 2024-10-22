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
    user_profile: null
  }

  public resetUser(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      user_profile: null
    }
  }
}
