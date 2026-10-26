import { isAxiosError } from 'axios';
import { trim } from 'lodash/fp';

export const getuserError = (
  t: (key: string, options?: Record<string, string | number>) => string,
  error: Error,
): string =>
  !isAxiosError(error)
    ? error.message
    : error.response?.data?.code === 'USERNAME_ALREADY_EXISTS'
      ? t('USERNAME_EXISTS')
      : trim(error.response?.data?.message ?? '') || error.message;
