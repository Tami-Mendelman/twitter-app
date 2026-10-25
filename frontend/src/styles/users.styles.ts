import { createUseStyles } from 'react-jss';

export const useUsersStyles = createUseStyles({
  card: {
    padding: '24px',
    backgroundColor: '#fff',
    border: '1px solid #dfe3e8',
    borderRadius: '12px',
  },
  displayName: {
    margin: 0,
    color: '#17202a',
    fontSize: '18px',
    fontWeight: 700,
  },
  username: {
    margin: '8px 0 0',
    color: '#657786',
    fontSize: '14px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '720px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#fff',
    border: '1px solid #dfe3e8',
    borderRadius: '12px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#17202a',
    fontWeight: 600,
  },
  input: {
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
  button: {
    padding: '12px 16px',
    border: 0,
    borderRadius: '6px',
    backgroundColor: '#1769aa',
    color: '#fff',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
  validationError: {
    margin: 0,
    color: '#b42318',
    fontSize: '14px',
    fontWeight: 400,
  },
});