import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: { id: number; name: string }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.users;
  }
}
