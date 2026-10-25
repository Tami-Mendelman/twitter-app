import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useUserProfile } from '../functions/profile.functions';
import { useProfileStyles } from '../styles/profile.styles';

const UserProfilePage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'PROFILE_PAGE' });
  const { userId = '' } = useParams();
  const { data: profile, isPending, error } = useUserProfile(userId);
  const classes = useProfileStyles();

  return (
    <main className={classes.Page}>
      <header className={classes.Header}>
        <h1 className={classes.Title}>{t('USER_TITLE')}</h1>
      </header>
      {isPending ? (
        <p className={classes.Message}>{t('LOADING')}</p>
      ) : error ? (
        <p className={`${classes.Message} ${classes.Error}`} role="alert">
          {t('LOAD_ERROR', { message: error.message })}
        </p>
      ) : profile ? (
        <section className={classes.Card} aria-label={t('PROFILE_LABEL')}>
          <h2 className={classes.DisplayName}>{profile.displayName}</h2>
          <p className={classes.Username}>@{profile.username}</p>
        </section>
      ) : null}
    </main>
  );
};

export default UserProfilePage;
