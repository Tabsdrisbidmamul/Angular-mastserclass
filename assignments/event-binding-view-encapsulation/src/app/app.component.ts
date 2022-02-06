import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'event-binding-view-encapsulation';
  counter = 0;
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  readCounter(event: { inc: number }): void {
    this.counter = event.inc;
    if (event.inc % 2 === 0) {
      this.evenNumbers.push(event.inc);
    } else {
      this.oddNumbers.push(event.inc);
    }
  }
}
