import { Injectable } from '@angular/core';
import { UserData } from '../../../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public showDropdown: boolean = false;
  public userData: UserData = {
    name: '',
    userProfile: ''
  }

  public toggleShowDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public resetUserData(): void {
    this.userData = {
      name: '',
      userProfile: ''
    }
  }
}
