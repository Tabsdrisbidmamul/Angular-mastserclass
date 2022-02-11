import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('form') form: NgForm | undefined;
  subscriptions = ['basic', 'advanced', 'pro'];
  subscriptionDefault = 'advanced';
  submitted = false;
  values = {
    email: '',
    subscriptions: '',
    password: '',
  };

  ngOnInit(): void {}

  submit() {
    this.submitted = true;

    this.values.email = this.form?.value.email;
    this.values.subscriptions = this.form?.value.subscriptions;
    this.values.password = this.form?.value.password;

    console.log(this.values);
  }
}
