import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { find } from 'lodash/fp';
import userService from '../../services/user';
import { QUERY_KEYS } from '../../utils/queryKeys';
import type { User } from '@libs/types/user.type.js';

export const UserProfilePage: FC = () => {
  const { userId } = useParams();
  const { data: users } = useQuery({ queryKey: QUERY_KEYS.USERS, queryFn: userService.getAllUsers });
  const user = users ? find((u: User) => String(u._id) === String(userId))(users) : undefined;

  return (
    <section>
      <h1>{user?.displayName ?? 'User'}</h1>
      <p>{user ? `@${user.username}` : 'User unavailable'}</p>
    </section>
  );
};

export default UserProfilePage;