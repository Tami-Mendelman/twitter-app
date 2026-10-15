import { useAuth } from '../components/auth-context';
import type { User } from '../types/models.types';

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
