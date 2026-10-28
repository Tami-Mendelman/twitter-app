import { isAxiosError } from 'axios';
import { trim } from 'lodash/fp';

export const getUserError = (
  error: Error,
  usernameExistsMessage: string,
  createErrorMessage: string,
): string =>
  !isAxiosError(error)
    ? error.message
    : error.response?.data?.code === 'USERNAME_ALREADY_EXISTS'
      ? usernameExistsMessage
      : trim(error.response?.data?.message ?? '') || createErrorMessage;

