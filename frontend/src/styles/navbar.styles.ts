import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useNavbarStyles = createUseStyles({
  Navbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#17202a',
    '& a': {
      color: '#fff',
      textDecoration: 'none',
      padding: '8px 12px',
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
});
