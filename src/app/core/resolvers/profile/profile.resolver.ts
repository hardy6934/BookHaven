import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs'; 
import { Profile } from '../../../shared/models/profile.model';
import { ProfileService } from '../../../features/profile/services/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(private profileService: ProfileService) {}

  resolve(): Observable<Profile> {
    return this.profileService.getProfile();  
  }
}