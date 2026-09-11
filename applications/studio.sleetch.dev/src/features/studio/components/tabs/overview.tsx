import type { tree_object } from '@sleetch/core/compiler';
import { Heading1, Languages, type LucideIcon, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useClientStore } from '@/shared/stores/client';

export function count_tree_objects(tree: tree_object[]) {
	let categories = 0;
	let pages = 0;

	function visit(nodes: tree_object[]) {
		for (const node of nodes) {
			if (node.type === 'page') {
				pages++;
			} else {
				categories++;
				visit(node.children);
			}
		}
	}

	visit(tree);

	return { categories, pages };
}

export function count_trees_objects(trees: Record<string, tree_object[]>) {
	let categories = 0;
	let pages = 0;

	for (const tree of Object.values(trees)) {
		const count = count_tree_objects(tree);
		categories += count.categories;
		pages += count.pages;
	}

	return { categories, pages };
}

function Card(data: { icon: LucideIcon; title: string; value: number }) {
	return (
		<div className="bg-accent border rounded-sm p-3 py-6">
			<div className="flex gap-2 items-center text-muted-foreground">
				<data.icon className="size-5" />
				<h1 className="text-base">{data.title}</h1>
			</div>
			<p className="text-3xl font-bold font-brand">{data.value}</p>
		</div>
	);
}

export function Overview() {
	const state = useClientStore();

	const [categoriesCount, setCategoriesCount] = useState(0);
	const [pagesCount, setPagesCount] = useState(0);

	useEffect(() => {
		const count = count_trees_objects(state.trees);
		setCategoriesCount(count.categories);
		setPagesCount(count.pages);
	}, [state.trees]);

	return (
		<div className="w-full flex flex-col gap-3">
			<div className="grid grid-cols-5 gap-3">
				<Card icon={Languages} title="Languages" value={state.languages.length} />
				<Card icon={Package} title="Categories" value={categoriesCount} />
				<Card icon={Heading1} title="Pages" value={pagesCount} />
			</div>
		</div>
	);
}

// pages repartition on languages

// Category Count
// Pages Count

// Sources Composition graph
// Sources Static / Dynamic graph

// Pages repartition on Static and dynamic sources
// Page modifications over time
