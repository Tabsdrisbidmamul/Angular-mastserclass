import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAuthRequestDTO, IAuthResponseDTO } from '../models/auth.model';
import { User } from '../models/user.model';
import { AgentInterceptor } from './agent-interceptor.service';
import { AgentService } from './agent.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends AgentService {
  user$ = new Subject<User>();

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  get token() {
    return localStorage.getItem('token');
  }

  login(email: string, password: string) {
    return this.post<IAuthRequestDTO, IAuthResponseDTO>(
      '',
      { email, password, returnSecureToken: true },
      'LOGIN'
    ).pipe(catchError(this.handleAuthError), tap(this.handleAuth));
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

  private handleAuth = (res: string | IAuthResponseDTO) => {
    if (res instanceof String) return;

    const _res = res as IAuthResponseDTO;

    const user: User = new User(
      _res.email,
      _res.localId,
      _res.idToken,
      new Date(new Date().getTime() + parseInt(_res.expiresIn) * 1000)
    );

    this.user$.next(user);
    localStorage.setItem('token', user.token);
  };

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
