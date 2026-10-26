import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { map } from 'lodash/fp';
import { useTranslation } from 'react-i18next';
import userService from '../../services/user';
import { QUERY_KEYS } from '../../utils/queryKeys';
import type { User } from '@libs/types/user.type.js';
import UserCard from './components/userCard';

const UsersPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'USERS_PAGE' });

  const { data: users, isPending, error } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAllUsers,
  });

  return (
    <div>
      <header>
        <h1>{t('TITLE')}</h1>
        <p>{t('SUBTITLE')}</p>
      </header>

      {isPending ? (
        <p>{t('LOADING')}</p>
      ) : error ? (
        <p>{t('LOAD_ERROR', { message: error.message })}</p>
      ) : !users.length ? (
        <p>{t('EMPTY')}</p>
      ) : (
        <section aria-label={t('USERS_LIST_LABEL')}>
          {map((user: User) => (
            <UserCard key={user._id} user={user} />
          ))(users)}
        </section>
      )}
    </div>
  );
};

export default UsersPage;
