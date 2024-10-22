import { Injectable } from '@angular/core';
import { UserData } from '../../../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public showDropdown: boolean = false;
  public user_data: UserData = {
    name: '',
    user_profile: ''
  }

  public toggleShowDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
