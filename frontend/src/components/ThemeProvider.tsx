import { useThemeStyles } from '../styles/theme.styles';
import { useThemeProviderValue } from '../functions/theme-provider.functions';
import type { ThemeProviderProps } from '../functions/theme-provider.types';
import { THEME_CONTEXT } from '../functions/theme-context';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeContextValue = useThemeProviderValue();
  useThemeStyles();

  return (
    <THEME_CONTEXT.Provider value={themeContextValue}>
      {children}
    </THEME_CONTEXT.Provider>
  );
};
