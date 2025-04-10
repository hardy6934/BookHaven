import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordMatchValidator } from '../../validators/password-match.validator';
import { Register } from '../../../../shared/models/register.model';
import { Md5 } from 'md5-typescript';  
import { AuthService } from '../../services/auth-service/auth.service';


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registrationForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]],
    },
    {
      validators: PasswordMatchValidator
    }
  )

  onSubmit() {
    if (this.registrationForm.valid) {
      const regModel = this.registerFormToRegisterModelMapper();
      this.authService.register(regModel)
      .subscribe({next: (response)=> 
      {
        console.log(response);
        console.log(this.registrationForm.value);
        if(response.email === regModel.email && response.password === regModel.password)
        {
          alert("Успешно зарегестрирован");
          this.router.navigate(['/login']);
        }
      }
      });
    }
  }

  registerFormToRegisterModelMapper(): Register { 
    const registerModel: Register = {
      email: this.registrationForm.value.email!,
      password: Md5.init(this.registrationForm.value.password),
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyIiwibmFtZSI6IkFsZXgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTYyMzkwMjIsImV4cCI6MTc0MzQ0NjQwMH0.zDU0x9jTYqTtUzmoapFA8AKKOsNJOAJS1rbc9flt4ig",
    }
    return registerModel 
  }
 
}
