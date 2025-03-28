import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordMatchValidator } from '../../validators/password-match.validator';

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
      passwordConfirmation: ['', [Validators.required ]],
    },
    {
      validators: PasswordMatchValidator
    }
  )

  onSubmit(){
    if(this.registrationForm.valid){
      console.log("Form data_____", this.registrationForm.value)
    }
  }
}
