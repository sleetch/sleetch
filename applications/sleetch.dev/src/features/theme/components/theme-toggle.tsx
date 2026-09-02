import { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from '../hooks/use-theme';
import type { Theme } from '../types/themes';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();
	const baseRef = useRef<HTMLSpanElement>(null);

	const handleChange = useCallback(
		async (nextTheme: Theme) => {
			if (!baseRef.current) return;

			const rect = baseRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const maxDistance = Math.hypot(Math.max(centerX, window.innerWidth - centerX), Math.max(centerY, window.innerHeight - centerY));

			if (!document.startViewTransition) {
				setTheme(nextTheme);
				return;
			}

			document.startViewTransition(() => {
				flushSync(() => {
					setTheme(nextTheme);
				});
			});

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
					duration: 1000,
					easing: 'ease-in-out',
					pseudoElement: '::view-transition-new(root)',
				},
			);
		},
		[setTheme],
	);

	return (
		<div>
			<select
				value={theme}
				onChange={(e) => handleChange(e.target.value as Theme)}
				// onClick={() => handleChange(theme === "dark" ? "light" : "dark")}
			>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
				<option value="system">System</option>
			</select>
			<span ref={baseRef} style={{ position: 'absolute', opacity: 0 }}>
				anchor
			</span>
		</div>
	);
}
