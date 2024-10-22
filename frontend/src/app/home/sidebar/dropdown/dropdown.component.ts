import { Component, inject } from '@angular/core';
import { SidebarService } from '../../../services/home/sidebar/sidebar.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  public sidebarService: SidebarService = inject(SidebarService);
}
