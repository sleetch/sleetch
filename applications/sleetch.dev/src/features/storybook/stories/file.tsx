import { defineStory, File } from '@sleetch/react';

export default defineStory({
	component: File,
	variants: {
		default: { "name": "index.ts" },
		test: { "name": "index.ts", "comment": "With comment" },
	},
});

// import {story} from "@/features/stories/button.tsx"
