import { createUseStyles } from 'react-jss';
import { down } from './breakpoints';

export const usePostStyles = createUseStyles({
  Card: {
    padding: '24px',
    backgroundColor: 'var(--surface-background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '12px',
    overflowWrap: 'anywhere',
  },
  Author: {
    margin: 0,
    color: 'var(--text-primary)',
    fontSize: '16px',
    fontWeight: 700,
  },
  AuthorLink: {
    display: 'inline-block',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover $Author': {
      color: 'var(--link-color)',
      textDecoration: 'underline',
    },
    '&:focus-visible': {
      outline: '2px solid var(--link-color)',
      outlineOffset: '4px',
    },
  },
  Username: {
    marginTop: '4px',
    color: 'var(--text-secondary)',
    fontSize: '14px',
  },
  Name: {
    margin: '16px 0 8px',
    fontSize: '18px',
    fontWeight: 700,
  },
  Text: {
    margin: 0,
    color: 'var(--text-body)',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  },
  Media: {
    display: 'inline-block',
    marginTop: '16px',
    color: 'var(--link-color)',
    overflowWrap: 'anywhere',
  },
  Image: {
    display: 'block',
    width: '100%',
    maxHeight: '60vw',
    marginTop: '16px',
    objectFit: 'contain',
    objectPosition: 'left center',
  },
  Pdf: {
    width: '100%',
    marginTop: '16px',
  },
  PdfViewer: {
    display: 'block',
    width: '100%',
    height: '60vw',
    maxHeight: '720px',
    border: '1px solid var(--surface-border)',
    borderRadius: '8px',
  },
  Footer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid var(--surface-border)',
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
  },
  Textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '12px',
    border: '1px solid var(--input-border)',
    borderRadius: '6px',
    font: 'inherit',
    resize: 'vertical',
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
  DeleteButton: {
    padding: '12px 16px',
    border: 0,
    borderRadius: '6px',
    backgroundColor: 'var(--danger-color)',
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