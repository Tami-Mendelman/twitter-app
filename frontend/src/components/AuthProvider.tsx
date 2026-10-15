import type { PropsWithChildren } from 'react';
import { useAuthSession } from '../functions/auth-session.functions';
import { AUTH_CONTEXT } from './auth-context';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const authSession = useAuthSession();

  return (
    <AUTH_CONTEXT.Provider value={authSession}>
      {children}
    </AUTH_CONTEXT.Provider>
  );
};
