import { useTranslation } from 'react-i18next';
import { useTheme } from '../functions/theme-context';
import type { ThemeToggleButtonProps } from '../functions/theme-toggle.types';
import { useThemeToggleStyles } from '../styles/theme-toggle.styles';

const ThemeToggleButton = ({ isAuthPage = false }: ThemeToggleButtonProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'NAVBAR' });
  const { theme, toggleTheme } = useTheme();
  const classes = useThemeToggleStyles();
  const className = isAuthPage
    ? `${classes.Button} ${classes.AuthButton}`
    : classes.Button;

  return (
    <button
      className={className}
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? t('LIGHT_THEME') : t('DARK_THEME')}
    </button>
  );
};

export default ThemeToggleButton;
