export interface signupRequestDTO {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface signupResponseDTO {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}
