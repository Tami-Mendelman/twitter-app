import { api } from '../api';
import type { User } from '../types/models.types';
import type {
  AuthSession,
  LoginCredentials,
  RegistrationCredentials,
} from '../types/auth.types';

export const registerUser = async (
  credentials: RegistrationCredentials,
): Promise<AuthSession> => {
  const { data } = await api.post<AuthSession>('/auth/register', credentials);
  return data;
};

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthSession> => {
  const { data } = await api.post<AuthSession>('/auth/login', credentials);
  return data;
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};
