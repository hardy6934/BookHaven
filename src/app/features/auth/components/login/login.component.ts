import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';  
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);

  loginForm = this.fb.group(
    {
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
    }
  )

  onSubmit(){
    if(this.loginForm.valid){
      console.log("Form data_____", this.loginForm.value)
    }
  }

}
