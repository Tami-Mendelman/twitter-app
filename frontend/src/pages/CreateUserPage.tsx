import { useCreateUserForm } from '../functions/user-form.functions';
import { useUsersStyles } from '../styles/users.styles';
import { useFeedStyles } from '../styles/feed.styles';
import { useTranslation } from 'react-i18next';

const CreateUserPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'CREATE_USER_PAGE' });
  const classes = useUsersStyles();
  const pageClasses = useFeedStyles();

  const {
    register,
    handleFormSubmit,
    errors,
    isPending,
    error,
    isSuccess,
  } = useCreateUserForm();

  return (
    <main className={pageClasses.Page}>
      <header className={pageClasses.Header}>
        <h1 className={pageClasses.Title}>{t('TITLE')}</h1>
        <p className={pageClasses.Subtitle}>
          {t('SUBTITLE')}
        </p>
      </header>

      <form className={classes.Form} onSubmit={handleFormSubmit}>
        <label className={classes.Field}>
          {t('USERNAME')}
          <input
            className={classes.Input}
            {...register('username', {
              required: t('USERNAME_REQUIRED'),
              minLength: {
                value: 1,
                message: t('USERNAME_EMPTY'),
              },
            })}
          />
          {errors.username ? (
            <span className={classes.ValidationError}>
              {errors.username.message}
            </span>
          ) : null}
        </label>

        <label className={classes.Field}>
          {t('DISPLAY_NAME')}
          <input
            className={classes.Input}
            {...register('displayName', {
              required: t('DISPLAY_NAME_REQUIRED'),
              minLength: {
                value: 1,
                message: t('DISPLAY_NAME_EMPTY'),
              },
            })}
          />
          {errors.displayName ? (
            <span className={classes.ValidationError}>
              {errors.displayName.message}
            </span>
          ) : null}
        </label>

        {error ? (
          <p className={pageClasses.Error}>
            {t('CREATE_ERROR', { message: error })}
          </p>
        ) : null}

        {isSuccess ? (
          <p role="status">{t('CREATED')}</p>
        ) : null}

        <button
          className={classes.Button}
          type="submit"
          disabled={isPending}
        >
          {isPending ? t('SUBMITTING') : t('SUBMIT')}
        </button>
      </form>
    </main>
  );
};

export default CreateUserPage;