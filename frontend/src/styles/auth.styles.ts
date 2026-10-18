import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useAuthStyles = createUseStyles({
  Page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '32px',
  },
  Card: {
    width: '460px',
    maxWidth: '100%',
    padding: '32px',
    backgroundColor: '#fff',
    border: '1px solid #dfe3e8',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(23, 32, 42, 0.08)',
  },
  Title: {
    margin: '0 0 24px',
    color: '#17202a',
    fontSize: '28px',
  },
  Form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  Field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#17202a',
    fontWeight: 600,
  },
  Input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #cbd2d9',
    borderRadius: '6px',
    font: 'inherit',
    '&:focus': {
      outline: '2px solid #1769aa',
      outlineOffset: '1px',
    },
  },
  Button: {
    padding: '12px 16px',
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
    fontSize: '14px',
    fontWeight: 400,
  },
  Footer: {
    margin: '24px 0 0',
    color: '#657786',
    '& a': {
      color: '#1769aa',
    },
  },
  [down('phone')]: {
    Card: {
      width: '100%',
      padding: '20px',
    },
    Page: {
      padding: '20px',
    },
  },
});
