import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public showDropdown: boolean = false;

  public toggleShowDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
