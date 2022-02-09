import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isActivated = false;
  private activatedSub = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.activatedEmitter
      .pipe(takeUntil(this.activatedSub))
      .subscribe((data) => (this.isActivated = data));
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
