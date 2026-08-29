import { useEffect, useState } from 'react';
import { THEME_LOCAL_STORAGE_KEY, Themes } from '../lib/constants';
import type { Theme, ThemeProviderProps } from '../types/themes';
import { ThemeProviderContext } from './context';

export function ThemeProvider({ children, defaultTheme = 'dark', ...props }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const stored = window.localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Theme | null;
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
            window.localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
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
                const storageKey = "${THEME_LOCAL_STORAGE_KEY}";
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
