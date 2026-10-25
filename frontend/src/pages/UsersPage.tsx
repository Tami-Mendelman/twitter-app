import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { map } from 'lodash/fp';
import userService from '../services/user';
import { useFeedStyles } from '../styles/feed.styles';
import { useUsersStyles } from '../styles/users.styles';
import { useTranslation } from 'react-i18next';
import type { User } from '../../../libs/types/user.type.js';

const UsersPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'USERS_PAGE' });
  const classes = useFeedStyles();
  const { data: users, isPending, error } = useQuery({
    queryKey: ['user-service', 'user', 'all'],
    queryFn: userService.getAllUsers,
  });
  const userClasses = useUsersStyles();

  const UserCard: FC<{ user: User }> = ({ user }) => (
    <article className={userClasses.card}>
      <h2 className={userClasses.displayName}>{user.displayName}</h2>
      <p className={userClasses.username}>@{user.username}</p>
    </article>
  );

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