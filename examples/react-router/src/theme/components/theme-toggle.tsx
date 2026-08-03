import { Moon, Sun, Monitor } from 'lucide-react';
import { flushSync } from 'react-dom';
import { useCallback, useRef } from 'react';
import { Button } from '@ladoc/react';
import { Themes, type Theme } from '../types/themes';
import { useTheme } from '../lib';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const baseRef = useRef<HTMLElement>(null);

  const handleButton = useCallback(
    async (theme: Theme) => {
      if (!baseRef.current) return;

      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(theme);
        });
      }).ready;

      const { left, top, width, height } = baseRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const maxDistance = Math.hypot(Math.max(centerX, window.innerWidth - centerX), Math.max(centerY, window.innerHeight - centerY));

      document.documentElement.animate(
        [
          {
            clipPath: `circle(0px at ${centerX}px ${centerY}px)`,
            filter: 'blur(20px)',
          },
          {
            clipPath: `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
            filter: 'blur(0px)',
          },
        ],
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    },
    [theme]
  );

  return (
    <div className="space-x-6 ">
      {Themes.map((theme) => (
        <Button key={theme} className="space-x-3" onClick={() => handleButton(theme)}>
          <div className="relative h-[1.2rem]">
            <Sun className="absolute size-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="size-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          <span>{theme}</span>
          <span ref={baseRef} className="sr-only">
            Toggle Theme
          </span>
        </Button>
      ))}
    </div>
  );
}
