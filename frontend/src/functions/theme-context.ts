import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const THEME_CONTEXT = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
  const themeContext = useContext(THEME_CONTEXT);

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return themeContext;
};
