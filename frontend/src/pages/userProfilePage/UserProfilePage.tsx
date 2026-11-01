import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { find } from 'lodash/fp';
import { useTranslation } from 'react-i18next';
import userService from '../../services/user';
import { QUERY_KEYS } from '../../utils/queryKeys';
import type { User } from '@libs/types/user.type.js';

export const UserProfilePage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'USER_PROFILE_PAGE' });
  const { userId } = useParams();
  const { data: users } = useQuery({ queryKey: QUERY_KEYS.USERS, queryFn: userService.getAllUsers });
  const user = users ? find(({ _id }: User) => String(_id) === String(userId))(users) : undefined;

  return (
    <>
      <h1>{user?.displayName ?? t('USER')}</h1>
      <p>{user ? `@${user.username}` : t('USER_UNAVAILABLE')}</p>
    </>
  );
};
