import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IAuthResponseDTO } from '../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogin = true;
  form: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const { email, password } = this.form.value as {
      email: string;
      password: string;
    };

    this.isLoading = true;
    this.error = null;

    let authObs: Observable<IAuthResponseDTO | string>;

    if (this.isLogin) {
      authObs = this._authService.login(email, password);
    } else {
      authObs = this._authService.signup(email, password);
    }

    authObs.subscribe(
      (res) => {
        this.isLoading = false;
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.form.reset();
  }
}
