import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useNavbarStyles = createUseStyles({
  Navbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#17202a',
    '& a': {
      color: '#fff',
      textDecoration: 'none',
      padding: '12px 16px',
      borderRadius: '6px',
    },
    '& a.active': {
      backgroundColor: '#35434f',
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
    color: '#fff',
    padding: '12px 16px',
  },
  Logout: {
    padding: '12px 16px',
    border: '1px solid #8996a3',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    font: 'inherit',
  },
});
