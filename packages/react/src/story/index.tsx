// biome-ignore-all  lint/suspicious/noExplicitAny : Any types are expected behavior here.

import styles from '@sleetch/styles/components/story.module.css';
import type { ComponentProps, ComponentType, ReactElement } from 'react';
import { lazy, Suspense } from 'react';

export function defineStory<
	T extends ComponentType<any>,
	V extends Record<string, {
		props: ComponentProps<T>;
		dotted?: boolean;
		render?: (props: ComponentProps<T>) => ReactElement;
	}>
>(data: {
	component: T;
	variants: V;
}) {
	const variants = Object.keys(data.variants) as (keyof V)[];
	const render = (variant: keyof V) => data.variants[variant].render ? data.variants[variant].render(data.variants[variant].props) : <data.component {...data.variants[variant].props} />
	return {
		variants,
		render,
		Component: ({ variants: selected }: {
			variants?: (keyof V)[];
		} = {}) => {
			return <div className={`no-sleetch-markdown ${styles.book}`}>
				{(selected ?? variants).map((variant) => {
					return (
						<div
							key={variant.toString()}
							className={`${styles.card} ${data.variants[variant].dotted ? styles.cardDotted : ""}`}
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

type StoryVariant<
	T extends Record<string, StoryLoader>,
	K extends keyof T,
> =
	Awaited<ReturnType<T[K]>>['default']['variants'][number];

type BookProps<
	T extends Record<string, StoryLoader>,
	K extends keyof T,
> = {
	story: K;
	variants?: StoryVariant<T, K>[];
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

	return {
		Component,
	};
}
