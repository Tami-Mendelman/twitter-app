import type { FC } from 'react';
import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { trim } from 'lodash/fp';
import userService from '../../services/user';
import { useCreateUserStyles } from './styles';
import { useFeedStyles } from '../../styles/feed.styles';
import { useTranslation } from 'react-i18next';
import type { CreateUserPayload } from '../../../../libs/types/user.type.js';
import { QUERY_KEYS } from '../../utils/queryKeys';

const CreateUserPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'CREATE_USER_PAGE' });
  const classes = useCreateUserStyles();
  const pageClasses = useFeedStyles();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserPayload>();

  const {
    mutate: create,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: userService.createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });

  const handleFormSubmit = handleSubmit((payload: CreateUserPayload) => {
    create(payload);
  });

  const getCreateUserError = (error: Error): string =>
    !isAxiosError(error)
      ? error.message
      : error.response?.data?.code === 'USERNAME_ALREADY_EXISTS'
        ? t('USERNAME_EXISTS')
        : trim(error.response?.data?.message ?? '') || error.message;

  const createUserError = error ? getCreateUserError(error) : null;

  return (
    <div className={pageClasses.page}>
      <header className={pageClasses.header}>
        <h1 className={pageClasses.title}>{t('TITLE')}</h1>
        <p className={pageClasses.subtitle}>
          {t('SUBTITLE')}
        </p>
      </header>

      <form className={classes.form} onSubmit={handleFormSubmit}>
        <label className={classes.field}>
          {t('USERNAME')}
          <input
            className={classes.input}
            {...register('username', {
              required: t('USERNAME_REQUIRED'),
              minLength: {
                value: 1,
                message: t('USERNAME_EMPTY'),
              },
            })}
          />
          {errors.username && (
            <span className={classes.validationError}>
              {errors.username.message}
            </span>
          )}
        </label>

        <label className={classes.field}>
          {t('DISPLAY_NAME')}
          <input
            className={classes.input}
            {...register('displayName', {
              required: t('DISPLAY_NAME_REQUIRED'),
              minLength: {
                value: 1,
                message: t('DISPLAY_NAME_EMPTY'),
              },
            })}
          />
          {errors.displayName && (
            <span className={classes.validationError}>
              {errors.displayName.message}
            </span>
          )}
        </label>

        {createUserError && (
          <p className={pageClasses.error}>
            {t('CREATE_ERROR', { message: createUserError })}
          </p>
        )}

        {isSuccess && <p role="status">{t('CREATED')}</p>}

        <button
          className={classes.button}
          type="submit"
          disabled={isPending}
        >
          {isPending ? t('SUBMITTING') : t('SUBMIT')}
        </button>
      </form>
    </div>
  );
};

export default CreateUserPage;
