import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = {
    email: '',
    password: ''
  }

  public resetUser(): void {
    this.user = {
      email: '',
      password: ''
    }
  }
}
