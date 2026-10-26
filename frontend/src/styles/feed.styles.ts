import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useFeedStyles = createUseStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      margin: 0,
      backgroundColor: '#f5f7fa',
      color: '#17202a',
      fontFamily: 'Arial, sans-serif',
    },
    button: {
      font: 'inherit',
    },
  },
  page: {
    width: '100%',
    padding: '24px 32px',
  },
  header: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 32px',
    paddingBottom: '16px',
    borderBottom: '1px solid #dfe3e8',
  },
  title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: 700,
    color: '#17202a',
  },
  subtitle: {
    marginTop: '8px',
    color: '#657786',
    fontSize: '16px',
  },
  searchInput: {
    display: 'block',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 24px',
    padding: '14px 20px',
    border: '1px solid #dfe3e8',
    borderRadius: '999px',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#17202a',
    font: 'inherit',
    boxShadow: '0 2px 8px rgba(23, 32, 42, 0.06)',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    '&::placeholder': {
      color: '#8996a3',
    },
    '&:focus': {
      borderColor: '#1769aa',
      boxShadow: '0 0 0 3px rgba(23, 105, 170, 0.14)',
    },
  },
  [down('phone')]: {
    page: {
      padding: '20px 16px',
    },
    title: {
      fontSize: '26px',
    },
  },
});