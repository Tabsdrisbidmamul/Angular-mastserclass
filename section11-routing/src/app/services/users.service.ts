import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _users = [
    {
      id: 1,
      name: 'Max',
    },
    {
      id: 2,
      name: 'Anna',
    },
    {
      id: 3,
      name: 'Chris',
    },
  ];

  get users() {
    return this._users.slice();
  }
}
