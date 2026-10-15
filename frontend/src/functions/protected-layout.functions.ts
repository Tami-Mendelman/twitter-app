import { find } from 'lodash/fp';
import { useAuth } from '../components/auth-context';

export type ProtectedLayoutState =
  | { status: 'loading'; message: '' }
  | { status: 'error'; message: string }
  | { status: 'authenticated'; message: '' }
  | { status: 'unauthenticated'; message: '' };

type ProtectedLayoutCandidate = {
  isActive: boolean;
  state: ProtectedLayoutState;
};

const isActiveLayoutCandidate = (
  candidate: ProtectedLayoutCandidate,
): boolean => candidate.isActive;

const getProtectedLayoutState = (
  isLoading: boolean,
  message: string | null,
  hasUser: boolean,
): ProtectedLayoutState => {
  const candidates: ProtectedLayoutCandidate[] = [
    { isActive: isLoading, state: { status: 'loading', message: '' } },
    {
      isActive: Boolean(message),
      state: { status: 'error', message: message ?? '' },
    },
    {
      isActive: hasUser,
      state: { status: 'authenticated', message: '' },
    },
  ];
  const activeCandidate = find(isActiveLayoutCandidate, candidates);

  return activeCandidate?.state ?? {
    status: 'unauthenticated',
    message: '',
  };
};

export const useProtectedLayoutState = (): ProtectedLayoutState => {
  const { user, isLoading, sessionError } = useAuth();

  return getProtectedLayoutState(isLoading, sessionError, Boolean(user));
};
