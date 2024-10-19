import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public showSidebar: boolean = true;

  public toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
