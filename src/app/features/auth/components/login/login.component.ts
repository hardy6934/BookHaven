import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { Auth } from '../../../../shared/models/auth.model';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);

  constructor() { }

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
  )

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginFormToAuthModelMapper()).subscribe({
        error: (err) => { alert(`Ошибка: ${err.message}`); }
      });
    }
  }

  

  loginFormToAuthModelMapper(): Auth {

    const authModel: Auth = {
      email: this.loginForm.value.email || "",
      password: this.loginForm.value.password || ""
    }
    return authModel

  }


}
