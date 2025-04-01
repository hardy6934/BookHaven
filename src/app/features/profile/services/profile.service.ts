import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../../shared/models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)

  constructor() { }
 
  getProfile(): Observable<any>{
    return this.http.get<Profile>('http://localhost:3000/profile');
  }
   
}
