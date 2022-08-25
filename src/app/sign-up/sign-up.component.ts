import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PasswordMatch } from '../validators/password-match.validator';
import { UniqueUsername } from '../validators/unique-username.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(4),
      ]),
    },
    { validators: [this.passwordMatch.validate] }
  );
  constructor(
    private passwordMatch: PasswordMatch,
    private uniqueUsername: UniqueUsername,
    private accountService: AccountService,
    private router: Router
  ) {}

  onSubmit() {
    this.accountService.signUp(this.authForm.value).subscribe({
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
