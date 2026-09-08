import type { tree_object } from '@sleetch/core/compiler';
import { create } from 'zustand';

type ClientState = {
	languages: string[];
	set_languages: (languages: string[]) => void;

	trees: Record<string, tree_object[]>;
	set_tree: (language: string, tree: tree_object[]) => void;
};

export const useClientStore = create<ClientState>((set) => ({
	languages: [],
	set_languages: (languages) => set({ languages }),

	trees: {},
	set_tree: (language, tree) =>
		set((state) => ({
			trees: { ...state.trees, [language]: tree },
		})),
}));
