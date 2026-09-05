import { Button, defineStory } from '@sleetch/react';

export default defineStory({
	component: Button,
	variants: {
		default: { children: 'Hello Story', variant: 'default' },
		destructive: { children: 'Hello Story', variant: 'destructive' },
		ghost: { children: 'Hello Story', variant: 'ghost' },
		outline: { children: 'Hello Story', variant: 'outline' },
		primary: { children: 'Hello Story', variant: 'primary' },
		secondary: { children: 'Hello Story', variant: 'secondary' },
	},
});

// import {story} from "@/features/stories/button.tsx"
