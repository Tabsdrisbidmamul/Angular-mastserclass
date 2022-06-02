import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, first, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AgentInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiKey = environment.apiKey;
    const BASE_URL_SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    const BASE_URL_LOGIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const BASE_URL_DB = 'https://angular-e2153-default-rtdb.firebaseio.com/';
    let apiReq: HttpRequest<any>;
    // default to auth endpoint
    let isEndpoint = 'DB';
    if (req.headers.has('useEndpoint')) {
      isEndpoint = req.headers.get('useEndpoint');
    }

    return this._authService.user$.pipe(
      take(1),
      exhaustMap((user) => {
        switch (isEndpoint) {
          case 'SIGNUP': {
            apiReq = req.clone({
              url: `${BASE_URL_SIGNUP}`,
              headers: req.headers.delete('useEndpoint', 'SIGNUP'),
            });
            break;
          }
          case 'LOGIN': {
            apiReq = req.clone({
              url: `${BASE_URL_LOGIN}`,
              headers: req.headers.delete('useEndpoint', 'LOGIN'),
            });
            break;
          }
          case 'DB': {
            apiReq = req.clone({
              url: `${BASE_URL_DB}${req.url}.json?auth=${user.token}`,
            });
            break;
          }
        }

        return next.handle(apiReq);
      })
    );
  }
}
