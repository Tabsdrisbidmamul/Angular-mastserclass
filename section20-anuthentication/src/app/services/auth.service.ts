import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signupResponseDTO } from '../models/auth.model';
import { AgentService } from './agent.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends AgentService {
  constructor(protected _http: HttpClient) {
    super(_http);
  }

  signup(email: string, password: string) {
    return this.post<signupResponseDTO>(
      '',
      {
        email,
        password,
        returnSecureToken: true,
      },
      'SIGNUP'
    );
  }
}
