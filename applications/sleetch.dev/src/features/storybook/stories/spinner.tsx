import { defineStory, Spinner } from '@sleetch/react';

export default defineStory({
	component: Spinner,
	variants: {
		default: {
			props: {},
		},

		sizes: {
			props: {
				size: 'medium',
			},
			render: () => (
				<div className="flex items-end gap-4">
					<Spinner size="small" aria-label="Loading" />
					<Spinner size="medium" aria-label="Loading" />
					<Spinner size="large" aria-label="Loading" />
				</div>
			),
		},

		loading: {
			props: {
				'aria-label': 'Loading',
				role: 'status',
			},
		},

		withContent: {
			props: {},
			render: () => (
				<div className="flex items-center gap-2">
					<Spinner aria-label="Loading" role="status" />
					<span>Loading...</span>
				</div>
			),
		},

		customClass: {
			props: {
				className: 'my-custom-spinner',
			},
		},

		pageLoading: {
			props: {
				'aria-label': 'Loading page',
				role: 'status',
			},
			render: (props) => (
				<div className="flex min-h-32 items-center justify-center">
					<Spinner {...props} />
				</div>
			),
		},
	},
});
