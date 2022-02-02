import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent implements OnInit {
  toggleContent = false;
  buttonClicks: Date[] = [];
  constructor() {}

  ngOnInit(): void {}

  onClickToggleContent(): void {
    this.toggleContent = !this.toggleContent;
    // this.buttonClicks.push(this.buttonClicks.length + 1);
    this.buttonClicks.push(new Date());
  }
}
