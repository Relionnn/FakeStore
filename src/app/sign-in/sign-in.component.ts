import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(4),
    ]),
  });

  constructor(private accountService: AccountService, private router: Router) {}

  onSubmit() {
    this.accountService.signIn(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ credentials: true });
        }
      },
    });
  }
}
