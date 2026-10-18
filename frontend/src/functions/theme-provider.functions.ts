import { useEffect, useState } from 'react';
import type { Theme, ThemeContextValue } from './theme-context';

const THEME_STORAGE_KEY = 'twitter-app-theme';

const getInitialTheme = (): Theme =>
  window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';

const getNextTheme = (theme: Theme): Theme =>
  theme === 'light' ? 'dark' : 'light';

export const useThemeProviderValue = (): ThemeContextValue => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = (): void => {
    setTheme(getNextTheme);
  };

  const persistTheme = (): void => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  useEffect(persistTheme, [theme]);

  return { theme, toggleTheme };
};
