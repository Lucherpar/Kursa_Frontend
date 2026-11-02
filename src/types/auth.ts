export type Role = 'admin' | 'profesor' | 'estudiante';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
