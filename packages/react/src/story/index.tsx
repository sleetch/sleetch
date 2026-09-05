// biome-ignore-all  lint/suspicious/noExplicitAny : Any types are expected behavior here.

import styles from '@sleetch/styles/components/story.module.css';
import type { ComponentProps, ComponentType, ReactElement } from 'react';
import { lazy, Suspense } from 'react';

export function defineStory<T extends ComponentType<any>, V extends { [K in keyof V]: ComponentProps<T> }>(data: {
	component: T;
	variants: V;
	dotted?: boolean;
}): {
	variants: (keyof V)[];
	render: (variant: keyof V) => ReactElement;
	Component: () => ReactElement;
} {
	const variants = Object.keys(data.variants) as (keyof V)[];
	const render = (variant: keyof V) => <data.component {...data.variants[variant]} />;
	return {
		variants,
		render,
		Component: () => {
			return <div className={`no-sleetch-markdown ${styles.book}`}>
				{variants.map((variant) => {
					return (
						<div
							key={variant.toString()}
							className={`${styles.card} ${data.dotted ? styles.cardDotted : ""}`}
						>
							{render(variant)}
							<span className={styles.variantLabel}>{variant.toString()}</span>
						</div>
					)
				})}
			</div>
		},
	};
}

type StoryLoader = () => Promise<{
	default: ReturnType<typeof defineStory>;
}>;

type BookProps<T extends Record<string, StoryLoader>> = {
	story: keyof T;
};

export function defineBook<T extends Record<string, StoryLoader>>(stories: T) {
	function Component({ story }: BookProps<T>) {
		const Story = lazy(async () => {
			const module = await stories[story]();

			return {
				default: module.default.Component,
			};
		});

		return (
			<Suspense fallback={null}>
				<Story />
			</Suspense>
		);
	}

	return {
		Component,
	};
}
