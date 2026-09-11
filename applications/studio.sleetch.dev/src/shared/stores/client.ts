import type { tree_object } from '@sleetch/core/compiler';
import type { parsed_sleetch_configuration } from '@sleetch/core/configuration';
import { create } from 'zustand';

type DynamicClientStateVariables = {
	loading: boolean;
	languages: string[];
	trees: Record<string, tree_object[]>;
	sources: parsed_sleetch_configuration["sources"];
};

type StaticClientStateVariables = {
	tab: "overview" | "pages"
};

type ClientStateMethods = {
	set_tab: (tab: StaticClientStateVariables["tab"]) => void;
	set_languages: (languages: DynamicClientStateVariables["languages"]) => void;
	set_sources: (sources: DynamicClientStateVariables["sources"]) => void;
	set_tree: (language: string, tree: tree_object[]) => void;
	set_loading: (loading: DynamicClientStateVariables["loading"]) => void;
	refresh_loading: () => void;
	reset: () => void;
};

const initialState: DynamicClientStateVariables = {
	languages: [],
	trees: {},
	loading: true,
	sources: []
}

type ClientState = DynamicClientStateVariables & StaticClientStateVariables & ClientStateMethods

export const useClientStore = create<ClientState>((set, get) => ({
	...initialState,
	tab: "overview",
	set_languages: (languages) => {
		set({ languages })
		get().refresh_loading()
	},
	set_sources: (sources) => {
		set({ sources })
		get().refresh_loading()
	},
	set_tree: (language, tree) => {
		set((state) => ({
			trees: { ...state.trees, [language]: tree },
		}))
		get().refresh_loading()
	},
	set_tab: (tab) => set({ tab }),
	set_loading: (loading) => set({ loading }),
	refresh_loading: () => {
		const { languages, trees, sources, set_loading } = get()
		if (languages.length > 0 && Object.keys(trees).length > 0 && sources.length > 0) {
			set_loading(false)
		}
	},
	reset: () => set(initialState),
}));
