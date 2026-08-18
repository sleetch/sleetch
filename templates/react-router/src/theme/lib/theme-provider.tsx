import { useEffect, useState } from 'react';
import { ThemeProviderContext } from './theme-context';
import { Themes, type ThemeProviderProps } from '../types/themes';
import type { Theme } from '../types/themes';
import { storageKey } from '.';

export function ThemeProvider({ children, defaultTheme = 'dark', ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove(...Themes);

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      window.localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function AntiFlickeringScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
              (function() {
                const storageKey = "${storageKey}";
                const stored = localStorage.getItem(storageKey);
                let theme = stored || "system";
                let systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches  ? "dark" : "light";
                let applied = theme === "system" ? systemTheme : theme;
                document.documentElement.classList.remove(${Themes.filter((t) => !['dark', 'light'].includes(t))
                  .map((x) => `"${x}"`)
                  .join(', ')});
                document.documentElement.classList.add(applied);
              })();
            `,
      }}
    />
  );
}
