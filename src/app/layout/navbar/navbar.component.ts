import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [PrimaryButtonComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
