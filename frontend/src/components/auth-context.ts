import { createContext, useContext } from 'react';
import type { AuthSessionState } from '../functions/auth-session.functions';

export const AUTH_CONTEXT = createContext<AuthSessionState | null>(null);

export const useAuth = (): AuthSessionState => {
  const authContext = useContext(AUTH_CONTEXT);

  if (!authContext) throw new Error('useAuth must be used within an AuthProvider');

  return authContext;
};
