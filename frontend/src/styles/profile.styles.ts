import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useProfileStyles = createUseStyles({
  Page: {
    width: '100%',
    minHeight: '100vh',
    padding: '24px 48px',
  },
  Header: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 24px',
    paddingBottom: '12px',
    borderBottom: '1px solid #dfe3e8',
  },
  Title: {
    margin: 0,
    color: '#17202a',
    fontSize: '32px',
  },
  Card: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#fff',
    border: '1px solid #dfe3e8',
    borderRadius: '12px',
  },
  DisplayName: {
    margin: 0,
    color: '#17202a',
    fontSize: '24px',
  },
  Username: {
    margin: '16px 0 0',
    color: '#657786',
    fontSize: '16px',
  },
  [down('phone')]: {
    Page: {
      padding: '20px',
    },
    Card: {
      padding: '16px',
    },
    Title: {
      fontSize: '28px',
    },
  },
});
