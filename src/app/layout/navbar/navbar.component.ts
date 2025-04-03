import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth-service/auth.service'; 
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookService } from '../../features/homepage/services/book.service';

@Component({
  selector: 'app-navbar',
  imports: [PrimaryButtonComponent, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  authService = inject(AuthService);
  bookService = inject(BookService);
  isLoggedIn = false; 

 
  constructor(private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();
 
       this.authService.isLoggedIn$.pipe(takeUntilDestroyed()).subscribe(status => {
         this.isLoggedIn = status;
       });
  } 
   
  logout(): void {  
     this.authService.logout(); 
     this.router.navigate(['/login']);
  }
  
  navigateTo(route: string): void{ 
    this.router.navigateByUrl(route).then(() => {
      this.bookService.loadBooks().subscribe()
    });
  }

  
} 

