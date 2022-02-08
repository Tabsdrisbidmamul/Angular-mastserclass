import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accounts: { name: string; status: string }[] = [];
  _accountService: AccountService;

  constructor(private accountService: AccountService) {
    this._accountService = accountService;
  }

  ngOnInit(): void {
    this.accounts = this._accountService.accounts;
  }
}
