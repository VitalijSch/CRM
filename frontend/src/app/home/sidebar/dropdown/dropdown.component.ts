import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../services/home/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  public sidebarService: SidebarService = inject(SidebarService);
  private router: Router = inject(Router);

  public signOut(event: MouseEvent): void {
    event.stopPropagation();
    this.sidebarService.toggleShowDropdown();
    this.sidebarService.resetUserData();
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/sign-in']);
  }
}
