import { defineStory, File, FileSystem, Folder } from '@sleetch/react';

export default defineStory({
	component: FileSystem,
	variants: {
		default: {
			dotted: true,
			props: {
				className: "w-100",
				children: (
					<>
						<Folder name="src">
							<File name="index.ts" />
							<File name="app.tsx" />
							<File name="styles.css" />
						</Folder>
						<File name="package.json" />
						<File name="README.md" />
					</>
				),
			},
		},

		nested: {
			props: {
				className: "w-100",
				children: (
					<>
						<Folder name="src">
							<Folder name="components">
								<File name="Button.tsx" />
								<File name="Input.tsx" />
							</Folder>
							<Folder name="utils">
								<File name="format.ts" />
								<File name="helpers.ts" />
							</Folder>
							<File name="index.ts" />
						</Folder>
					</>
				),
			},
		},

		comments: {
			props: {
				className: "w-100",
				children: (
					<>
						<File name="package.json" comment="2 KB" />
						<File name="README.md" comment="Updated today" />
						<File name="index.ts" comment="1.2 KB" />
					</>
				),
			},
		},

		selected: {
			props: {
				className: "w-100",
				children: (
					<>
						<Folder name="src">
							<File name="index.ts" selected />
							<File name="app.tsx" />
							<File name="styles.css" />
						</Folder>
						<File name="package.json" />
					</>
				),
			},
		},

		hidden: {
			props: {
				className: "w-100",
				children: (
					<>
						<Folder name="src">
							<File name="index.ts" />
						</Folder>
						<Folder name=".git" hidden>
							<File name="config" />
							<File name="HEAD" />
						</Folder>
						<File name=".gitignore" />
					</>
				),
			},
		},

		project: {
			props: {
				className: "w-100",
				children: (
					<>
						<Folder name="my-project">
							<Folder name="src">
								<Folder name="components">
									<File name="Button.tsx" comment="3.1 KB" />
									<File name="FileSystem.tsx" selected comment="4.8 KB" />
								</Folder>
								<Folder name="styles">
									<File name="global.css" />
									<File name="theme.css" />
								</Folder>
								<File name="index.ts" />
							</Folder>

							<Folder name="tests">
								<File name="Button.test.tsx" />
								<File name="FileSystem.test.tsx" />
							</Folder>

							<Folder name="docs">
								<File name="README.md" />
								<File name="CONTRIBUTING.md" />
							</Folder>

							<File name="package.json" comment="1.8 KB" />
							<File name="tsconfig.json" />
							<File name=".gitignore" />
						</Folder>
					</>
				),
			},
		},
	},
});
