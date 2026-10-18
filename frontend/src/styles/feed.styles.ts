import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const useFeedStyles = createUseStyles({
  Page: {
    width: '100%',
    minHeight: '100%',
    padding: '24px 48px',
  },
  Header: {
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 32px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--surface-border)',
  },
  Title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  Subtitle: {
    marginTop: '8px',
    color: 'var(--text-secondary)',
    fontSize: '16px',
  },
  SearchInput: {
    display: 'block',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto 24px',
    padding: '14px 20px',
    border: '1px solid var(--surface-border)',
    borderRadius: '999px',
    outline: 'none',
    backgroundColor: 'var(--surface-background)',
    color: 'var(--text-primary)',
    font: 'inherit',
    boxShadow: '0 2px 8px var(--card-shadow)',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    '&::placeholder': {
      color: 'var(--text-muted)',
    },
    '&:focus': {
      borderColor: 'var(--link-color)',
      boxShadow: '0 0 0 3px var(--focus-shadow)',
    },
  },
  Feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
  },
  Message: {
    padding: '24px',
    backgroundColor: 'var(--surface-background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
    color: 'var(--text-secondary)',
  },
  Error: {
    color: 'var(--danger-color)',
  },
  [down('phone')]: {
    Page: {
      padding: '20px',
    },
    Title: {
      fontSize: '26px',
    },
    Message: {
      padding: '16px',
    },
  },
});