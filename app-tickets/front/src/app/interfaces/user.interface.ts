export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
  role?: string;
}

export interface IResponse {
  message: string;
  token: string;
  user: string;
}
