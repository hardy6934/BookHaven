import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';  

@Injectable( {
  providedIn: 'root'
})
export class AuthService { 
 
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  readonly isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  router = inject(Router);

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken');  // Проверяем, есть ли токен
  }

  login(): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', {
      login: 'login',
      password: 'password' 
    }).pipe(  
      tap(response => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyIiwibmFtZSI6IkFsZXgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTYyMzkwMjIsImV4cCI6MTc0MzQ0NjQwMH0.zDU0x9jTYqTtUzmoapFA8AKKOsNJOAJS1rbc9flt4ig';
        localStorage.setItem('jwtToken', token); 

        this.isLoggedInSubject.next(true);  

        this.router.navigate(['/']);

      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.isLoggedInSubject.next(false);

    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

}
