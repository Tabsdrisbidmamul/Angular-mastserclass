export class User implements IUser {
  private constructor(
    public email: string,
    public id: string,
    private _token: string,
    public readonly tokenExpires: Date
  ) {}

  static buildUserWithUserObject(user: IUser) {
    return User.buildUserWithParameters(
      user.email,
      user.id,
      user.token,
      user.tokenExpires
    );
  }

  static buildUserWithParameters(
    email: string,
    id: string,
    _token: string,
    _tokenExpires: Date
  ) {
    return new User(email, id, _token, _tokenExpires);
  }

  static buildUserWithParametersFromLocalStorage(user: IUserLocalStorage) {
    return new User(
      user.email,
      user.id,
      user._token,
      new Date(user.tokenExpires)
    );
  }

  get token() {
    if (this.tokenExpires === null || new Date() > this.tokenExpires) {
      return null;
    }

    return this._token;
  }
}

export interface IUser {
  email: string;
  id: string;
  get token(): string;
  readonly tokenExpires: Date;
}

export interface IUserLocalStorage {
  email: string;
  id: string;
  _token: string;
  tokenExpires: string;
}
