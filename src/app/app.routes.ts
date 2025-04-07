import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component'; 
import { RegistrationComponent } from './features/auth/components/registration/registration.component';
import { authGuard } from './core/guards/auth.guard'; 
import { ProfileComponent } from './features/profile/comonents/profile.component';
import { ProfileResolver } from './core/resolvers/profile/profile.resolver';
import { HomepageComponent } from './features/homepage/components/homepage.component';
import { IndexComponent } from './features/index/index.component';
import { CategoriesComponent } from './features/categories/components/categiries/categories.component';

export const routes: Routes = [
    { path: '', component: IndexComponent, title: 'index'},  
    { path: 'login', component: LoginComponent, title: 'Login' }, 
    { path: 'registration', component: RegistrationComponent, title: 'Registration' }, 
    { path: 'profile', component: ProfileComponent, title: 'Profile', 
      resolve: {profileData: ProfileResolver}, canActivate: [authGuard] 
    }, 
    { path: 'categories', component: CategoriesComponent, title: 'Categories', canActivate: [authGuard] }, 
    { path: 'home', component: HomepageComponent, title: 'Home', canActivate: [authGuard] }, 
    { path: '**', redirectTo: '' } 
  ];
