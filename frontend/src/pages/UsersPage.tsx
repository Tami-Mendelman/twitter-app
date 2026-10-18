import { useUsersData } from '../functions/users-query.functions';
import UserCard from '../components/UserCard';
import { useFeedStyles } from '../styles/feed.styles';
import { useTranslation } from 'react-i18next';

const UsersPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'USERS_PAGE' });
  const classes = useFeedStyles();
  const { data: users, isPending, error } = useUsersData();

  return (
    <main className={classes.Page}>
      <header className={classes.Header}>
        <h1 className={classes.Title}>{t('TITLE')}</h1>
        <p className={classes.Subtitle}>{t('SUBTITLE')}</p>
      </header>

      {isPending ? (
        <p className={classes.Message}>{t('LOADING')}</p>
      ) : error ? (
        <p className={`${classes.Message} ${classes.Error}`}>
          {t('LOAD_ERROR', { message: error.message })}
        </p>
      ) : !users.length ? (
        <p className={classes.Message}>{t('EMPTY')}</p>
      ) : (
        <section className={classes.Feed} aria-label={t('USERS_LIST_LABEL')}>
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </section>
      )}
    </main>
  );
};

export default UsersPage;