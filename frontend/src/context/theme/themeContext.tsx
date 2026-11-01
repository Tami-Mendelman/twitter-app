/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Function0 } from 'lodash';

export type ThemeType = 'light' | 'dark';

export type ThemeContextValue = {
  theme: ThemeType;
  toggleTheme: Function0<void>;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  });
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.style.setProperty('--bg-color', theme === 'dark' ? '#121212' : '#ffffff');
    document.documentElement.style.setProperty('--text-color', theme === 'dark' ? '#ffffff' : '#000000');
  }, [theme]);
  
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
