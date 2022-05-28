import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AgentInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiKey = environment.apiKey;

    const BASE_URL_SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    const BASE_URL_DB = 'https://angular-e2153-default-rtdb.firebaseio.com/';

    // default to auth endpoint
    let isEndpoint = 'SIGNUP';
    if (req.headers.has('useEndpoint')) {
      isEndpoint = req.headers.get('useEndpoint');
    }

    switch (isEndpoint) {
      case 'SIGNUP': {
        const apiReq = req.clone({
          url: `${BASE_URL_SIGNUP}`,
          headers: req.headers.delete('useEndpoint', 'SIGNUP'),
        });
        console.log(apiReq);
        return next.handle(apiReq);
      }
      case 'DB': {
        const apiReq = req.clone({ url: `${BASE_URL_DB}${req.url}.json` });
        return next.handle(apiReq);
      }
    }
  }
}
