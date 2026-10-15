import { createUseStyles } from 'react-jss';

export const useAuthStyles = createUseStyles({
  Page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '4vw',
  },
  Card: {
    width: '36vw',
    maxWidth: '100%',
    padding: '2vw',
    backgroundColor: '#fff',
    border: '1px solid #dfe3e8',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(23, 32, 42, 0.08)',
  },
  Title: {
    margin: '0 0 1.5rem',
    color: '#17202a',
    fontSize: '1.75rem',
  },
  Form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  Field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    color: '#17202a',
    fontWeight: 600,
  },
  Input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #cbd2d9',
    borderRadius: '6px',
    font: 'inherit',
    '&:focus': {
      outline: '2px solid #1769aa',
      outlineOffset: '1px',
    },
  },
  Button: {
    padding: '0.75rem 1rem',
    border: 0,
    borderRadius: '6px',
    backgroundColor: '#1769aa',
    color: '#fff',
    cursor: 'pointer',
    font: 'inherit',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  Error: {
    margin: 0,
    color: '#b42318',
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  Footer: {
    margin: '1.5rem 0 0',
    color: '#657786',
    '& a': {
      color: '#1769aa',
    },
  },
  '@media (max-width: 600px)': {
    Card: {
      width: '100%',
      padding: '6vw',
    },
  },
});
