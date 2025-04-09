import { Component, inject, OnInit } from '@angular/core';
import { Profile } from '../../../shared/models/profile.model';
import { ActivatedRoute} from '@angular/router'; 

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
  }

}
