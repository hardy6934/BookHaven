import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordMatchValidator } from '../../validators/password-match.validator';
import { Register } from '../../../../shared/models/register.model';
import { Md5 } from 'md5-typescript'; 


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  fb = inject(FormBuilder);

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
      console.log("Form data_____", this.registrationForm.value)
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
