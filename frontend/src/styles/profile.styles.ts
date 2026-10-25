import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useProfileStyles = createUseStyles({
  Page: {
    width: '100%',
    minHeight: '100%',
    padding: '24px 48px',
  },
  Header: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 24px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--surface-border)',
  },
  Title: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '32px',
  },
  Card: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: 'var(--surface-background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
  },
  DisplayName: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '24px',
  },
  Username: {
    margin: '16px 0 0',
    color: 'var(--text-secondary)',
    fontSize: '16px',
  },
  Message: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    color: 'var(--text-secondary)',
  },
  Error: {
    color: 'var(--danger-color)',
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
