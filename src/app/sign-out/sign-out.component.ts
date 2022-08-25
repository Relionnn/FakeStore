import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.signOut().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
