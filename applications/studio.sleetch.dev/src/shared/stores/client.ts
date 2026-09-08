import { create } from 'zustand';

type ClientState = {
	languages: string[];
	set_languages: (languages: string[]) => void;
};

export const useClientStore = create<ClientState>((set) => ({
	languages: [],
	set_languages: (languages) => set({ languages }),
}));
