import axios from 'axios';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, loginUser, registerUser } from './auth.functions';
import {
  clearAuthToken,
  getAuthToken,
  storeAuthToken,
} from './auth-token.functions';
import type { AuthCredentials } from '../types/auth.types';
import type { User } from '../types/models.types';

export type AuthSessionState = {
  user: User | null;
  isLoading: boolean;
  sessionError: string | null;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signOut: () => void;
};

const AUTH_SESSION_QUERY_KEY = ['auth', 'current-user'];

const getSessionError = (error: Error): string =>
  error.message || 'Could not verify the current session.';

const isUnauthorizedError = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 401;

const clearTokenAndThrowError = (error: Error): never => {
  clearAuthToken();
  throw error;
};

const throwSessionError = (error: Error): never => {
  throw error;
};

const rejectSession = (error: Error): never =>
  isUnauthorizedError(error)
    ? clearTokenAndThrowError(error)
    : throwSessionError(error);

const getSessionUser = async (): Promise<User> =>
  getCurrentUser().catch(rejectSession);

const getSignInSession = (
  credentials: AuthCredentials,
): Promise<Awaited<ReturnType<typeof loginUser>>> =>
  credentials.mode === 'login'
    ? loginUser({ username: credentials.username })
    : registerUser({
        username: credentials.username,
        displayName: credentials.displayName,
      });

export const useAuthSession = (): AuthSessionState => {
  const queryClient = useQueryClient();
  const [hasSavedToken, setHasSavedToken] = useState(
    Boolean(getAuthToken()),
  );
  const sessionQuery = useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: getSessionUser,
    enabled: hasSavedToken,
    retry: false,
  });

  const signIn = async (
    credentials: AuthCredentials,
  ): Promise<void> => {
    const session = await getSignInSession(credentials);
    storeAuthToken(session.token);
    setHasSavedToken(true);
    queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, session.user);
  };

  const signOut = (): void => {
    clearAuthToken();
    setHasSavedToken(false);
    queryClient.removeQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
  };

  const isUnauthorized = isUnauthorizedError(sessionQuery.error);
  const sessionError =
    sessionQuery.error && !isUnauthorized
      ? getSessionError(sessionQuery.error)
      : null;

  return {
    user: isUnauthorized ? null : sessionQuery.data ?? null,
    isLoading: hasSavedToken && sessionQuery.isPending,
    sessionError,
    signIn,
    signOut,
  };
};
