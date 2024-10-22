import { Component, inject } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SidebarService } from '../../services/home/sidebar/sidebar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DropdownComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public sidebarService: SidebarService = inject(SidebarService);

  private router: Router = inject(Router);

  public activeMenu(menu: string): boolean {
    if (this.router.url.includes(menu)) {
      return true;
    }
    return false;
  }
}
