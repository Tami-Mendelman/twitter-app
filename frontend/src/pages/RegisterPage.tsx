import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthForm } from '../functions/auth-form.functions';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useAuthStyles } from '../styles/auth.styles';

const RegisterPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'AUTH_FORM' });
  const classes = useAuthStyles();
  const {
    register,
    handleFormSubmit,
    errors,
    errorMessage,
    isPending,
    usernameValidationRules,
    displayNameValidationRules,
  } = useAuthForm('register');

  return (
    <main className={classes.Page}>
      <ThemeToggleButton isAuthPage />
      <section className={classes.Card}>
        <h1 className={classes.Title}>{t('REGISTER_TITLE')}</h1>
        <form className={classes.Form} onSubmit={handleFormSubmit}>
          <label className={classes.Field}>
            {t('DISPLAY_NAME')}
            <input
              className={classes.Input}
              autoComplete="name"
              {...register('displayName', displayNameValidationRules)}
            />
            {errors.displayName ? (
              <span className={classes.Error}>
                {errors.displayName.message}
              </span>
            ) : null}
          </label>

          <label className={classes.Field}>
            {t('USERNAME')}
            <input
              className={classes.Input}
              autoComplete="username"
              {...register('username', usernameValidationRules)}
            />
            {errors.username ? (
              <span className={classes.Error}>{errors.username.message}</span>
            ) : null}
          </label>

          {errorMessage ? (
            <p className={classes.Error} role="alert">{errorMessage}</p>
          ) : null}

          <button className={classes.Button} type="submit" disabled={isPending}>
            {isPending ? t('REGISTER_PENDING') : t('REGISTER_SUBMIT')}
          </button>
        </form>
        <p className={classes.Footer}>
          {t('HAVE_ACCOUNT')} <Link to="/login">{t('LOGIN_LINK')}</Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
