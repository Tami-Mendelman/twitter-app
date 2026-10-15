import axios from 'axios';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { RegisterOptions } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import trim from 'lodash/fp/trim.js';
import { useAuth } from '../components/auth-context';
import type { AuthCredentials } from '../types/auth.types';

type AuthFormValues = {
  username: string;
  displayName: string;
};

type AuthFormMode = 'login' | 'register';
type AuthApiError = {
  message?: string;
};

type AuthText = (key: string) => string;

const AUTH_STATUS_ERROR_KEYS: Record<number, string> = {
  401: 'INVALID_CREDENTIALS',
  409: 'USERNAME_EXISTS',
};

const isAuthApiError = (
  error: Error,
): error is AxiosError<AuthApiError> => axios.isAxiosError(error);

const getUsernameValidationRules = (
  getText: AuthText,
): RegisterOptions<AuthFormValues, 'username'> => ({
  required: getText('USERNAME_REQUIRED'),
  maxLength: {
    value: 30,
    message: getText('USERNAME_MAX_LENGTH'),
  },
});

const getDisplayNameValidationRules = (
  getText: AuthText,
): RegisterOptions<AuthFormValues, 'displayName'> => ({
  required: getText('DISPLAY_NAME_REQUIRED'),
  maxLength: {
    value: 80,
    message: getText('DISPLAY_NAME_MAX_LENGTH'),
  },
});

const getAuthStatusErrorMessage = (
  status: number | undefined,
  getText: AuthText,
): string | null => {
  const errorKey = status ? AUTH_STATUS_ERROR_KEYS[status] : null;

  return errorKey ? getText(errorKey) : null;
};

const getResponseErrorMessage = (error: Error): string | null => {
  const responseMessage = isAuthApiError(error)
    ? error.response?.data?.message
    : null;

  return responseMessage ? trim(responseMessage) : null;
};

const getAuthErrorMessage = (
  error: Error,
  getText: AuthText,
): string => {
  const status = isAuthApiError(error) ? error.response?.status : undefined;
  const statusErrorMessage = getAuthStatusErrorMessage(status, getText);
  const responseErrorMessage = getResponseErrorMessage(error);

  return statusErrorMessage ?? responseErrorMessage ?? error.message;
};

const getCredentials = (
  mode: AuthFormMode,
  values: AuthFormValues,
): AuthCredentials =>
  mode === 'register'
    ? {
        mode,
        username: values.username,
        displayName: values.displayName,
      }
    : { mode, username: values.username };

export const useAuthForm = (mode: AuthFormMode) => {
  const { t } = useTranslation('translation', { keyPrefix: 'AUTH_FORM' });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: { username: '', displayName: '' },
  });

  const submitAuthentication = (values: AuthFormValues): Promise<void> =>
    signIn(getCredentials(mode, values));

  const navigateToFeed = (): void => {
    navigate('/posts', { replace: true });
  };

  const handleAuthenticationError = (error: Error): void => {
    setErrorMessage(getAuthErrorMessage(error, t));
  };

  const mutation = useMutation({
    mutationFn: submitAuthentication,
    onSuccess: navigateToFeed,
    onError: handleAuthenticationError,
  });

  const submitForm = (values: AuthFormValues): void => {
    setErrorMessage(null);
    mutation.mutate(values);
  };

  return {
    register,
    handleFormSubmit: handleSubmit(submitForm),
    errors,
    errorMessage,
    isPending: mutation.isPending,
    usernameValidationRules: getUsernameValidationRules(t),
    displayNameValidationRules: getDisplayNameValidationRules(t),
  };
};
