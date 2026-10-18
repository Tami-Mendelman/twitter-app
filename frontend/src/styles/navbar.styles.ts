import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useNavbarStyles = createUseStyles({
  Navbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: 'var(--nav-background)',
    '& a': {
      color: 'var(--nav-text)',
      textDecoration: 'none',
      padding: '12px 16px',
      borderRadius: '6px',
    },
    '& a.active': {
      backgroundColor: 'var(--nav-active-background)',
    },
    [down('phone')]: {
      gap: '8px',
      padding: '12px 16px',
      '& a': {
        padding: '8px',
      },
    },
  },
  Identity: {
    color: 'var(--nav-text)',
    padding: '12px 16px',
  },
  Logout: {
    padding: '12px 16px',
    border: '1px solid var(--nav-border)',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: 'var(--nav-text)',
    cursor: 'pointer',
    font: 'inherit',
  },
});
