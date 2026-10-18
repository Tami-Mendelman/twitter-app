import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useAuthStyles = createUseStyles({
  Page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100%',
    padding: '32px',
  },
  Card: {
    width: '460px',
    maxWidth: '100%',
    padding: '32px',
    backgroundColor: 'var(--surface-background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
    boxShadow: '0 8px 24px var(--card-shadow)',
  },
  Title: {
    margin: '0 0 24px',
    color: 'var(--text-primary)',
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
    color: 'var(--text-primary)',
    fontWeight: 600,
  },
  Input: {
    width: '100%',
    padding: '12px',
    border: '1px solid var(--input-border)',
    borderRadius: '6px',
    font: 'inherit',
    '&:focus': {
      outline: '2px solid var(--link-color)',
      outlineOffset: '1px',
    },
  },
  Button: {
    padding: '12px 16px',
    border: 0,
    borderRadius: '6px',
    backgroundColor: 'var(--button-background)',
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
    color: 'var(--danger-color)',
    fontSize: '14px',
    fontWeight: 400,
  },
  Footer: {
    margin: '24px 0 0',
    color: 'var(--text-secondary)',
    '& a': {
      color: 'var(--link-color)',
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
