export interface IAuthRequestDTO {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IAuthResponseDTO {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registerId?: boolean;
}
