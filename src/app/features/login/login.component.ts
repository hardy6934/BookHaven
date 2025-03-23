import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
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
