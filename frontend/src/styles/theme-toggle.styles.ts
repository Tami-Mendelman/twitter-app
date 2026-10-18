import { createUseStyles } from 'react-jss';

export const useThemeToggleStyles = createUseStyles({
  Button: {
    padding: '12px 16px',
    border: '1px solid var(--nav-border)',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: 'var(--nav-text)',
    cursor: 'pointer',
    font: 'inherit',
    '&:focus-visible': {
      outline: '2px solid var(--link-color)',
      outlineOffset: '2px',
    },
  },
  AuthButton: {
    position: 'fixed',
    top: '16px',
    right: '16px',
    zIndex: 1,
  },
});
