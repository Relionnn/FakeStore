import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, skipWhile, take, map, tap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AccountGuard implements CanActivate {
  signedIn: boolean;

  constructor(private accountService: AccountService) {
    this.accountService.signedIn$
      .pipe(
        skipWhile((value) => value === null),
        // map((value) => value!),
        tap((value) => {
          this.signedIn = !value;

          if (this.signedIn && window.location.href.includes('sign-in')) {
            window.location.pathname = '/';
          }
        })
      )
      .subscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // localStorage.setItem('klucz', 'wartosc');
    // localStorage.getItem('klucz');
    return this.signedIn;
  }
}
