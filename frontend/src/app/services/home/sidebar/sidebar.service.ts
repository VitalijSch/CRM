import { Injectable } from '@angular/core';
import { User } from '../../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public showDropdown: boolean = false;
  public userData: User = {
    username: '',
    email: '',
    profileImage: null,
  }

  public toggleShowDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public resetUserData(): void {
    this.userData = {
      username: '',
      email: '',
      profileImage: null,
    }
  }
}
