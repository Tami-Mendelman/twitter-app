import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { map } from 'lodash/fp';
import { useTranslation } from 'react-i18next';
import userService from '../../services/user';
import { useFeedStyles } from '../../styles/feed.styles';
import { QUERY_KEYS } from '../../utils/queryKeys';
import type { User } from '../../../../libs/types/user.type.js';
import UserCard from './components/userCard';

const UsersPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'USERS_PAGE' });
  const classes = useFeedStyles();

  const { data: users, isPending, error } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: userService.getAllUsers,
  });

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1 className={classes.title}>{t('TITLE')}</h1>
        <p className={classes.subtitle}>{t('SUBTITLE')}</p>
      </header>

      {isPending ? (
        <p className={classes.message}>{t('LOADING')}</p>
      ) : error ? (
        <p className={`${classes.message} ${classes.error}`}>
          {t('LOAD_ERROR', { message: error.message })}
        </p>
      ) : !users.length ? (
        <p className={classes.message}>{t('EMPTY')}</p>
      ) : (
        <section className={classes.feed} aria-label={t('USERS_LIST_LABEL')}>
          {map((user: User) => (
            <UserCard key={user._id} user={user} />
          ))(users)}
        </section>
      )}
    </div>
  );
};

export default UsersPage;
