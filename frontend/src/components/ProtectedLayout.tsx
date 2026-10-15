import { Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProtectedLayoutState } from '../functions/protected-layout.functions';
import Navbar from './Navbar';

const ProtectedLayout = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'AUTH_FORM' });
  const layoutState = useProtectedLayoutState();
  const layoutContent = {
    loading: <p role="status">{t('SESSION_LOADING')}</p>,
    error: (
      <p role="alert">{t('SESSION_ERROR', { message: layoutState.message })}</p>
    ),
    authenticated: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    unauthenticated: <Navigate to="/login" replace />,
  };

  return layoutContent[layoutState.status];
};

export default ProtectedLayout;
