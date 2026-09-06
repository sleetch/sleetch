// biome-ignore-all  lint/suspicious/noExplicitAny : Any types are expected behavior here.

import styles from '@sleetch/styles/components/story.module.css';
import type { ComponentProps, ComponentType, ReactElement } from 'react';
import { lazy, Suspense } from 'react';

export function defineStory<
	T extends ComponentType<any>,
	const V extends Record<string, {
		props: ComponentProps<T>;
		dotted?: boolean;
		render?: (props: ComponentProps<T>) => ReactElement;
	}>
>(data: {
	component: T;
	variants: V;
}): {
	variants: (keyof V)[];
	render: (variant: keyof V) => ReactElement;
	Component: (props?: {
		variants?: (keyof V)[];
	}) => ReactElement;
} {
	const variants = Object.keys(data.variants) as (keyof V)[];

	const render = (variant: keyof V) =>
		data.variants[variant].render
			? data.variants[variant].render(data.variants[variant].props)
			: <data.component {...data.variants[variant].props} />;

	return {
		variants,
		render,
		Component: ({ variants: selected } = {}) => {
			return (
				<div className={`no-sleetch-markdown ${styles.book}`}>
					{(selected ?? variants).map((variant) => (
						<div
							key={variant.toString()}
							className={`${styles.card} ${data.variants[variant].dotted
								? styles.cardDotted
								: ""
								}`}
						>
							{render(variant)}
							<span className={styles.variantLabel}>
								{variant.toString()}
							</span>
						</div>
					))}
				</div>
			);
		},
	};
}

type StoryLoader = () => Promise<{
	default: {
		variants: readonly PropertyKey[];
		Component: ComponentType<any>;
	};
}>;

type StoryVariants<L> =
	L extends () => Promise<{ default: infer S }>
	? S extends { variants: readonly (infer V)[] }
	? V
	: never
	: never;

type BookProps<
	T extends Record<string, StoryLoader>,
	K extends keyof T,
> = {
	story: K;
	variants?: StoryVariants<T[K]>[];
};

export function defineBook<T extends Record<string, StoryLoader>>(stories: T) {
	function Component<K extends keyof T>({
		story,
		variants,
	}: BookProps<T, K>) {
		const Story = lazy(async () => {
			const module = await stories[story]();

			return {
				default: module.default.Component,
			};
		});

		return (
			<Suspense fallback={null}>
				<Story variants={variants} />
			</Suspense>
		);
	}

	return { Component };
}
