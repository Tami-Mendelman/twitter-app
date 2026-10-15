import { useTranslation } from 'react-i18next';
import { useCurrentUserProfile } from '../functions/profile.functions';
import { useProfileStyles } from '../styles/profile.styles';

const ProfilePage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'PROFILE_PAGE' });
  const profile = useCurrentUserProfile();
  const classes = useProfileStyles();

  return (
    <main className={classes.Page}>
      <header className={classes.Header}>
        <h1 className={classes.Title}>{t('TITLE')}</h1>
      </header>
      <section className={classes.Card} aria-label={t('PROFILE_LABEL')}>
        <h2 className={classes.DisplayName}>{profile.displayName}</h2>
        <p className={classes.Username}>@{profile.username}</p>
      </section>
    </main>
  );
};

export default ProfilePage;
