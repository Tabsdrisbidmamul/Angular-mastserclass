import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAuthRequestDTO, IAuthResponseDTO } from '../models/auth.model';
import { IUserLocalStorage, User } from '../models/user.model';
import { AgentService } from './agent.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends AgentService {
  user$ = new BehaviorSubject<User>(null);
  private tokenTimerInterval;

  constructor(protected _http: HttpClient, private _router: Router) {
    super(_http);
  }

  login(email: string, password: string) {
    return this.post<IAuthRequestDTO, IAuthResponseDTO>(
      '',
      { email, password, returnSecureToken: true },
      'LOGIN'
    ).pipe(catchError(this.handleAuthError), tap(this.handleAuth));
  }

  autoLogin() {
    let user = this.getUserLocalStorage();
    if (user === null) return;

    const _user = User.buildUserWithParametersFromLocalStorage(user);

    if (_user.token !== null) {
      this.storeUser(_user);
      const expirationDate = this.getCurrentTokenExpirationDate(
        _user.tokenExpires
      );
      this.setAutoLogoutTimer(expirationDate);
    }
  }

  logout() {
    this.user$.next(null);
    this._router.navigate(['']);
    this.clearUserLocalStorage();

    if (this.tokenTimerInterval) {
      clearInterval(this.tokenTimerInterval);
    }

    this.tokenTimerInterval = null;
  }

  autoLogout(expiresIn: number) {
    this.tokenTimerInterval = setTimeout(() => this.logout(), expiresIn);
  }

  signup(email: string, password: string) {
    return this.post<IAuthRequestDTO, IAuthResponseDTO>(
      '',
      {
        email,
        password,
        returnSecureToken: true,
      },
      'SIGNUP'
    ).pipe(catchError(this.handleAuthError), tap(this.handleAuth));
  }

  storeUserLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserLocalStorage(): IUserLocalStorage | null {
    return JSON.parse(localStorage.getItem('userData'));
  }

  clearUserLocalStorage() {
    localStorage.removeItem('userData');
  }

  private handleAuth = (res: string | IAuthResponseDTO) => {
    if (res instanceof String) return;

    const _res = res as IAuthResponseDTO;

    const user: User = User.buildUserWithParameters(
      _res.email,
      _res.localId,
      _res.idToken,
      new Date(new Date().getTime() + parseInt(_res.expiresIn) * 1000)
    );

    this.storeUser(user);
    this.setAutoLogoutTimer(user.tokenExpires.getTime());
  };

  private storeUser(user: User) {
    this.user$.next(user);

    if (this.getUserLocalStorage() === null) {
      this.storeUserLocalStorage(user);
    }

    this._router.navigate(['recipes']);
  }

  private setAutoLogoutTimer(tokenExpires: number) {
    this.autoLogout(tokenExpires);
  }

  private getCurrentTokenExpirationDate(tokenDate: Date) {
    return tokenDate.getTime() - new Date().getTime();
  }

  private handleAuthError(errorRes: HttpErrorResponse): Observable<string> {
    let errorMsg = 'Something went wrong';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMsg = 'Email already taken, please use a different email address';
        break;
      }
      case 'OPERATION_NOT_ALLOWED':
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        errorMsg =
          'We are having trouble with signing you up, please try again';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMsg = 'Password was incorrect';
        break;
      }
      case 'USER_DISABLED': {
        errorMsg = 'This account has been disabled, please contact support ...';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMsg =
          'There is no account corresponding with the email address entered';
        break;
      }
    }

    return throwError(errorMsg);
  }
}
