import { rm } from "node:fs/promises";
import { CACHE_FOLDER, GIT_SOURCES_CACHE_FOLDER } from "@sleetch/core/compiler";
import type { command, command_options } from "@/types/command";

const options = {} as const satisfies command_options;

export const clean_command: command<typeof options> = {
	name: "clean",
	description: "Clean cached pages, trees, manifests and git sources.",
	active: true,
	options,
	action: async (options, cli) => {
		try {
			await rm(CACHE_FOLDER, { recursive: true, force: true });
			await rm(GIT_SOURCES_CACHE_FOLDER, {
				recursive: true,
				force: true,
			});
			console.log("Done !");
		} catch (error) {
			if (error instanceof Error) cli.error("error", error.message);
		}
	},
};
