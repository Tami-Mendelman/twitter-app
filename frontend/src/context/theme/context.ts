import { createContext } from 'react';
import type { ThemeType } from './types';

export type ThemeContextValue = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);