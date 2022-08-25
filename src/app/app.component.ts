import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FakeStore';
  signedIn$: BehaviorSubject<boolean>;

  constructor(private router: Router, private accountService: AccountService) {
    this.signedIn$ = this.accountService.signedIn$;
  }

  ngOnInit() {
    this.accountService.checkAuth().subscribe(() => {});
  }

  search() {
    this.router.navigate(['/search']);
  }
}
