import { Button, defineStory, Spinner } from '@sleetch/react';

export default defineStory({
	component: Button,
	variants: {
		default: {
			props: {
				children: 'Default',
				variant: 'default',
			},
		},

		primary: {
			props: {
				children: 'Primary',
				variant: 'primary',
			},
		},

		secondary: {
			props: {
				children: 'Secondary',
				variant: 'secondary',
			},
		},

		destructive: {
			props: {
				children: 'Delete',
				variant: 'destructive',
			},
		},

		ghost: {
			props: {
				children: 'Ghost',
				variant: 'ghost',
			},
		},

		outline: {
			props: {
				children: 'Outline',
				variant: 'outline',
			},
		},

		disabled: {
			props: {
				children: 'Disabled',
				variant: 'primary',
				disabled: true,
			},
		},

		loading: {
			props: {
				children: <>Saving... <Spinner /></>,
				variant: 'primary',
				disabled: true,
				className: "gap-2"
			},
		},

		grouped: {
			props: {
				children: 'Cancel',
				variant: 'outline',
			},
			render: (props) => (
				<div className="flex gap-2">
					<Button {...props} />
					<Button variant="primary">
						Save changes
					</Button>
				</div>
			),
		},

		actions: {
			props: {
				children: 'Delete',
				variant: 'destructive',
			},
			render: (props) => (
				<div className="flex gap-2">
					<Button variant="ghost">
						Cancel
					</Button>
					<Button {...props} />
				</div>
			),
		},
	},
});
