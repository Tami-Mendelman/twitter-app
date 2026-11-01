import { createUseStyles } from 'react-jss';
import { down } from '../../styles/breakpoints';

export const useStyles = createUseStyles({
  navbar: {
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
  themeToggle: {
    marginLeft: 'auto',
    padding: '8px 16px',
    borderRadius: '6px',
    border: '1px solid #35434f',
    backgroundColor: '#35434f',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#4a5a6a',
    },
  },
});
