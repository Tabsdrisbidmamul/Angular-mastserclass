import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

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

  constructor(private _authService: AuthService) {}

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

    if (this.isLogin) {
      //...
    } else {
      this._authService.signup(email, password).subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.error = 'An error occurred!';
          this.isLoading = false;
        }
      );
    }

    this.form.reset();
  }
}
