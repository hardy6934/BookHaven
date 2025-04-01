import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../../../shared/models/profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit { 

  activatedRoute = inject(ActivatedRoute);

  constructor(){}
 
  profileData!: Profile   


  ngOnInit(): void {
    this.profileData = this.activatedRoute.snapshot.data['profileData'];
    console.log(this.profileData); // Данные профиля загружены
  }

}
