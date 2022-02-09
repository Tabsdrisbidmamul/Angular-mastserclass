import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription = new Subject();

  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable = new Observable<number>((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        // if (count === 2) {
        //   observer.complete();
        // }
        // if (count > 3) {
        //   observer.error(new Error('Count is greater than 3'));
        // }
      }, 1000);
    });

    customIntervalObservable
      .pipe(
        takeUntil(this.firstObsSubscription),
        map((data) => `Round ${data + 1}`)
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error: Error) => {
          console.log(error);
        },
        () => {
          console.log('Completed all observable events');
        }
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.next();
    this.firstObsSubscription.unsubscribe();
  }
}
