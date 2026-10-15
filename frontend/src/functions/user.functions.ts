import { find } from 'lodash/fp';
import { api } from '../api';
import type { CreateUserPayload, User } from '../types/models.types';

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users');

  return data;
};

export const createUser = async (
  payload: CreateUserPayload,
): Promise<User> => {
  const { data } = await api.post<User>('/users', payload);

  return data;
};

const matchesUserId = (userId: string) => (user: User): boolean =>
  user._id === userId;

export const getUserById = (userId: string, users: User[]) =>
  find(matchesUserId(userId))(users);