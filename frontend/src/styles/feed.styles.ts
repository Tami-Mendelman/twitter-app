import { createUseStyles } from 'react-jss';

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
    '#root': {
      minHeight: '100vh',
    },
    button: {
      font: 'inherit',
    },
  },
  Page: {
    width: '100%',
    minHeight: '100vh',
    padding: '2vw 4%',
  },
  Header: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #dfe3e8',
  },
  Title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 700,
    color: '#17202a',
  },
  Subtitle: {
    marginTop: '0.5rem',
    color: '#657786',
    fontSize: '1rem',
  },
  SearchInput: {
    display: 'block',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 1.5rem',
    padding: '0.85rem 1.25rem',
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
  Feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
  },
  Message: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    border: '1px solid #dfe3e8',
    borderRadius: '12px',
    color: '#657786',
  },
  Error: {
    color: '#b42318',
  },
  '@media (max-width: 600px)': {
    Page: {
      padding: '4vw',
    },
    Title: {
      fontSize: '1.6rem',
    },
  },
});