import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { HomepageComponent } from './features/homepage/homepage.component';
import { RegistrationComponent } from './features/auth/components/registration/registration.component';
import { authGuard } from './core/guards/auth.guard'; 
import { ProfileComponent } from './features/profile/comonents/profile.component';
import { ProfileResolver } from './core/resolvers/profile/profile.resolver';

export const routes: Routes = [
    { path: '', component: HomepageComponent, title: 'home', pathMatch: 'full'},  
    { path: 'login', component: LoginComponent, title: 'Login' }, 
    { path: 'registration', component: RegistrationComponent, title: 'Registration' }, 
    { path: 'profile', component: ProfileComponent, title: 'Profile', 
      resolve: {profileData: ProfileResolver}, canActivate: [authGuard] 
    }, 
    { path: '**', redirectTo: '' } 
  ];
