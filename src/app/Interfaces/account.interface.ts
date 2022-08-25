export interface UserAvailableResponse {
  available: boolean;
}

export interface SignupCredentials {
  username: string | null | undefined;
  password: string | null | undefined;
  passwordConfirmation: string | null | undefined;
}

export interface SignupResponse {
  username: string;
}

export interface SigninResponse {
  authenticated: boolean;
  username: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}
