import { Injectable } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PasswordMatch implements Validator {
  validate(FormGroup: AbstractControl) {
    const { password, passwordConfirmation } = FormGroup.value;
    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}
