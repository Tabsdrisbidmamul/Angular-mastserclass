import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IAuthResponseDTO } from '../models/auth.model';
import { Router } from '@angular/router';
import { AlertComponent } from '../common/alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder/placeholder.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogin = true;
  form: FormGroup;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private destroy$ = new Subject();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

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

  clearError(event) {
    if (event !== null && event) {
      this.error = null;
    }
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
        this.showError(errorMessage);
        this.isLoading = false;
      }
    );

    this.form.reset();
  }

  private showError(msg: string) {
    const alertComp =
      this._componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComp);

    componentRef.instance.message = msg;
    componentRef.instance.close
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) hostViewContainerRef.clear();
      });
  }
}
