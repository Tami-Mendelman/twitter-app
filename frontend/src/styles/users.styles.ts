import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useUsersStyles = createUseStyles({
  Card: {
    padding: '24px',
    backgroundColor: 'var(--surface-background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
  },
  DisplayName: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '18px',
    fontWeight: 700,
  },
  Username: {
    margin: '8px 0 0',
    color: 'var(--text-secondary)',
    fontSize: '14px',
  },
  
  Form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: 'var(--surface-background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
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
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  ValidationError: {
    margin: 0,
    color: 'var(--danger-color)',
    fontSize: '14px',
    fontWeight: 400,
  },
  [down('phone')]: {
    Card: {
      padding: '16px',
    },
    Form: {
      padding: '16px',
    },
  },
});