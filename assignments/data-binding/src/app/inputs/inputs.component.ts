import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css'],
})
export class InputsComponent implements OnInit {
  username = '';

  constructor() {}

  ngOnInit(): void {}

  resetUsername(): void {
    this.username = '';
  }
}
