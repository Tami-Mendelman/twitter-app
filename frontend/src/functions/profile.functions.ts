import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../components/auth-context';
import type { User } from '../types/models.types';
import { getUserProfileById } from './user.functions';

export type CurrentUserProfile = Pick<User, '_id' | 'username' | 'displayName'>;

const requireCurrentUserProfile = (
  user: User | null,
): CurrentUserProfile => {
  if (!user) throw new Error('A signed-in user is required to view this page');

  return {
    _id: user._id,
    username: user.username,
    displayName: user.displayName,
  };
};

export const useCurrentUserProfile = (): CurrentUserProfile => {
  const { user } = useAuth();

  return requireCurrentUserProfile(user);
};

const createUserProfileQuery = (userId: string) => {
  const getUserProfile = async (): Promise<User> =>
    getUserProfileById(userId);

  return getUserProfile;
};

export const useUserProfile = (userId: string) =>
  useQuery({
    queryKey: ['users', userId],
    queryFn: createUserProfileQuery(userId),
    enabled: Boolean(userId),
  });
