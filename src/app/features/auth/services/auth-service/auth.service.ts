import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Auth } from '../../../../shared/models/auth.model';
import { Profile } from '../../../../shared/models/profile.model'; 
import { Md5 } from 'md5-typescript';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "http://localhost:3000/profile";

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  readonly isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  router = inject(Router);


  constructor(private http: HttpClient) {
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  login(authModel: Auth): Observable<Profile> {  
    return this.http.get<Profile>(`${this.apiURL}`)
      .pipe(
        map(response => { 
          if (response.email !== authModel.email) {
            throw new Error('Пользователь не найден');
          }
          if (response.password !== Md5.init(authModel.password)) {
            throw new Error('Неверный пароль');
          }
          return response;
        }),
        tap(response => { 
          console.log(response)
          const token = response.token;
          const email = response.email;
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('email', email);

          this.isLoggedInSubject.next(true);

          this.router.navigate(['/home']); 
        })
      );
  }

 

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
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
