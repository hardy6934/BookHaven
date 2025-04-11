import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PasswordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;
  
    return password === passwordConfirmation ? null : { passwordsMismatch: true };
  };