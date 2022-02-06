import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit {
  @Output() increment = new EventEmitter<{
    inc: number;
  }>();
  counter = 0;
  incInterval: any;

  constructor() {}

  ngOnInit(): void {}

  onStartClicked(): void {
    console.log('Start button has been clicked');
    this.incInterval = setInterval(() => {
      this.increment.emit({
        inc: this.counter++,
      });
    }, 1000);
  }

  onStopClicked(): void {
    clearInterval(this.incInterval);
  }
}
