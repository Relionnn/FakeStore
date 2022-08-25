import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AccountService } from '../account.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private accountService: AccountService) {}

  validate = (control: AbstractControl) => {
    return this.accountService.usernameAvailable(control.value).pipe(
      catchError((err) => {
        if (err.error.username) {
          return of({ nonUniqueUserName: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
