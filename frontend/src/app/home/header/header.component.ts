import { Component, inject } from '@angular/core';
import { HeaderService } from '../../services/home/header/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public headerService: HeaderService = inject(HeaderService);
}
