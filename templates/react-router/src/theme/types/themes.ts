export const Themes = ['dark', 'light', 'system'] as const;

export type Theme = (typeof Themes)[number];

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};
