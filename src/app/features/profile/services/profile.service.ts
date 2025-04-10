import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../../../shared/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)

  constructor() { }
 
  getProfile(): Observable<any>{
    const email = localStorage.getItem('email');
    
    return this.http.get<Profile[]>('http://localhost:3000/profile').pipe(
      map((profiles: Profile[]) =>
        profiles.find((profile) => profile.email === email)
      )
    )
  }
   
}
