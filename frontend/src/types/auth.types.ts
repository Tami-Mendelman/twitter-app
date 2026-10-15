import type { User } from './models.types';

export type LoginCredentials = {
  username: string;
};

export type RegistrationCredentials = LoginCredentials & {
  displayName: string;
};

export type AuthCredentials =
  | { mode: 'login'; username: string }
  | { mode: 'register'; username: string; displayName: string };

export type AuthSession = {
  token: string;
  user: User;
};
