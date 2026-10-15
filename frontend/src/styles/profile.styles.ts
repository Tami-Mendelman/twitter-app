import { createUseStyles } from 'react-jss';

export const useProfileStyles = createUseStyles({
  Page: {
    width: '100%',
    minHeight: '100vh',
    padding: '2vw 4%',
  },
  Header: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 2vw',
    paddingBottom: '1vw',
    borderBottom: '1px solid #dfe3e8',
  },
  Title: {
    margin: 0,
    color: '#17202a',
    fontSize: '2rem',
  },
  Card: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '2vw',
    backgroundColor: '#fff',
    border: '1px solid #dfe3e8',
    borderRadius: '12px',
  },
  DisplayName: {
    margin: 0,
    color: '#17202a',
    fontSize: '1.5rem',
  },
  Username: {
    margin: '1vw 0 0',
    color: '#657786',
    fontSize: '1rem',
  },
  '@media (max-width: 600px)': {
    Page: {
      padding: '4vw',
    },
    Card: {
      padding: '4vw',
    },
  },
});
