import type { content } from '../types/content';
import type { category, page, tree_object } from '../types/routing';
import { to_flat_tree } from '../utils/flat-tree';

export class sleetch_router {
	private trees: Map<string, tree_object[]> = new Map();
	private source_index: Map<string, Map<string, string>> = new Map();

	get_tree(language: string): tree_object[] {
		let tree = this.trees.get(language);

		if (!tree) {
			tree = [];
			this.trees.set(language, tree);
		}

		return tree;
	}

	get_flat_tree(language: string) {
		return to_flat_tree(this.get_tree(language));
	}

	get_languages(): string[] {
		return [...this.trees.keys()];
	}

	insert_object(language: string, object: tree_object, tree: tree_object[] = this.get_tree(language)) {
		const index = tree.findIndex((item) => item.path === object.path);

		// No existing node: simply insert it.
		if (index === -1) {
			tree.push(object);

			if (object.type === 'page') {
				this.index_page(language, object);
			} else if (object.page) {
				this.index_page(language, object.page);
			}

			return;
		}

		const existing = tree[index];

		// category + category
		//
		// Merge independently:
		// - frontmatter
		// - page
		// - children
		if (existing.type === 'category' && object.type === 'category') {
			this.merge_category(language, existing, object);
			return;
		}

		// category + page
		//
		// A page having the same path as a category
		// becomes the category's page.
		if (existing.type === 'category' && object.type === 'page') {
			this.set_category_page(language, existing, object);
			return;
		}

		// page + category
		//
		// Convert the existing page into the category's page,
		// then merge the category.
		if (existing.type === 'page' && object.type === 'category') {
			const merged: category<tree_object, content> = {
				...object,
				page: object.page ?? existing,
				children: [...object.children],
			};

			tree[index] = merged;

			if (merged.page) this.index_page(language, merged.page);

			if (object.page && object.page !== existing) {
				this.index_page(language, object.page);
			}

			return;
		}

		// page + page
		//
		// Same path means replacement.
		if (existing.type === 'page' && object.type === 'page') {
			this.unindex_page(language, existing);

			tree[index] = object;

			this.index_page(language, object);
		}
	}

	private merge_category(language: string, target: category<tree_object, content>, source: category<tree_object, content>) {
		// Merge frontmatter.
		if (source.frontmatter !== undefined) {
			target.frontmatter = source.frontmatter;
		}

		// Merge the category page.
		if (source.page) {
			this.set_category_page(language, target, source.page);
		}

		// Merge children recursively.
		for (const child of source.children) {
			this.insert_object(language, child, target.children);
		}
	}

	private set_category_page(language: string, category: category<tree_object, content>, page: page<content>) {
		if (category.page) {
			this.unindex_page(language, category.page);
		}

		category.page = page;

		this.index_page(language, page);
	}

	private index_page(language: string, page: page<content>) {
		this.get_source_index(language).set(this.source_key(page.content), page.path);
	}

	private unindex_page(language: string, page: page<content>) {
		const index = this.get_source_index(language);
		const key = this.source_key(page.content);

		// Only remove the index if it still points to this page.
		if (index.get(key) === page.path) {
			index.delete(key);
		}
	}

	join_object(language: string, object: tree_object, tree: tree_object[] = this.get_tree(language)) {
		// A source can only exist once in the routing tree.
		//
		// If the same source was previously associated with another
		// path, remove the old node before inserting the new one.
		if (object.type === 'page') {
			const previous_path = this.get_source_index(language).get(this.source_key(object.content));

			if (previous_path && previous_path !== object.path) {
				this.remove_object_from_path(language, previous_path);
			}
		}

		const target = this.ensure_category_path(language, object.path, tree);

		this.insert_object(language, object, target);
	}

	join(language: string, tree: tree_object[]) {
		for (const object of tree) {
			this.join_object(language, object);
		}
	}

	remove_object(language: string, object: tree_object) {
		this.remove_object_from_path(language, object.path);
	}

	remove_object_from_path(language: string, path: string, tree: tree_object[] = this.get_tree(language)): boolean {
		const index = tree.findIndex((object) => object.path === path);

		if (index !== -1) {
			const [removed] = tree.splice(index, 1);

			if (removed.type === 'page') {
				this.unindex_page(language, removed);
			} else {
				if (removed.page) {
					this.unindex_page(language, removed.page);
				}

				this.unindex_tree_pages(language, removed.children);
			}

			return true;
		}

		for (const node of tree) {
			if (node.type !== 'category') {
				continue;
			}

			if (this.remove_object_from_path(language, path, node.children)) {
				// A category can still be meaningful if it has a page
				// or frontmatter, even after all its children disappear.
				if (node.children.length === 0 && node.page === undefined && node.frontmatter === undefined) {
					const node_index = tree.indexOf(node);

					if (node_index !== -1) {
						tree.splice(node_index, 1);
					}
				}

				return true;
			}
		}

		return false;
	}

	private unindex_tree_pages(language: string, tree: tree_object[]) {
		for (const object of tree) {
			if (object.type === 'page') {
				this.unindex_page(language, object);
				continue;
			}

			if (object.page) {
				this.unindex_page(language, object.page);
			}

			this.unindex_tree_pages(language, object.children);
		}
	}

	path_from_content(language: string, content: content) {
		return this.get_source_index(language).get(this.source_key(content));
	}

	private get_source_index(language: string): Map<string, string> {
		let index = this.source_index.get(language);

		if (!index) {
			index = new Map();
			this.source_index.set(language, index);
		}

		return index;
	}

	private source_key(content: content): string {
		if (content.type === 'file-system') {
			return `file-system:${content.file_path}`;
		}

		if (content.type === 'git') {
			return `git:${content.file_url}`;
		}

		return 'unknown';
	}

	private ensure_category_path(language: string, path: string, tree: tree_object[] = this.get_tree(language)): tree_object[] {
		const segments = path.split('/').filter(Boolean);

		// The last segment is the object itself.
		segments.pop();

		let current_tree = tree;
		let cumulative = '';

		for (const segment of segments) {
			cumulative = `${cumulative}/${segment}`;

			let category = current_tree.find(
				(object): object is category<tree_object, content> => object.type === 'category' && object.path === cumulative,
			);

			if (!category) {
				category = {
					type: 'category',
					path: cumulative,
					children: [],
				};

				current_tree.push(category);
			}

			current_tree = category.children;
		}

		return current_tree;
	}
}
