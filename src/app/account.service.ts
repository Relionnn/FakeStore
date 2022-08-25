import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import {
  SigninCredentials,
  SigninResponse,
  SignupResponse,
  UserAvailableResponse,
} from './Interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UserAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signUp(credentials: any) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http.get<SigninResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated }) => {
        this.signedIn$.next(authenticated);
      })
    );
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    );
  }

  signIn(credentials: any) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(() => {
        this.signedIn$.next(true);
      })
    );
  }
}
