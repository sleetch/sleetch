export default [
  {
    type: 'category',
    path: '/.',
    children: [],
    frontmatter: { title: 'Documentation' },
    page: {
      type: 'page',
      path: '/.',
      content: {
        type: 'file-system',
        file_path: 'src/assets/content/default/_index.mdx',
        source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
      },
      frontmatter: { title: 'Documentation', description: 'Welcome to sleetch' },
    },
  },
  {
    type: 'category',
    path: '/accessibility',
    children: [],
    frontmatter: { title: 'Accessibility', order: 53 },
    page: {
      type: 'page',
      path: '/accessibility',
      content: {
        type: 'file-system',
        file_path: 'src/assets/content/default/accessibility/_index.mdx',
        source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
      },
      frontmatter: { title: 'Index test', description: 'No description.' },
    },
  },
  {
    type: 'category',
    path: '/getting-started',
    children: [
      {
        type: 'category',
        path: '/getting-started/examples',
        children: [
          {
            type: 'page',
            path: '/getting-started/examples/next-js',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/getting-started/examples/next-js.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'Next JS', description: 'This part of the documentation introduces markdown usage.' },
          },
          {
            type: 'page',
            path: '/getting-started/examples/react-router',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/getting-started/examples/react-router.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'React Router', description: 'This part of the documentation introduces markdown usage.' },
          },
          {
            type: 'page',
            path: '/getting-started/examples/tanstack-start',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/getting-started/examples/tanstack-start.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'Tanstack Start', description: 'This part of the documentation introduces markdown usage.' },
          },
        ],
        frontmatter: { title: 'Examples', order: 3 },
      },
      {
        type: 'page',
        path: '/getting-started/features',
        content: {
          type: 'file-system',
          file_path: 'src/assets/content/default/getting-started/features.mdx',
          source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
        },
        frontmatter: { title: 'Features', description: 'This part of the documentation introduces markdown usage.', order: 2 },
      },
      {
        type: 'page',
        path: '/getting-started/introduction',
        content: {
          type: 'file-system',
          file_path: 'src/assets/content/default/getting-started/introduction.mdx',
          source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
        },
        frontmatter: { title: 'Introduction', description: 'This part of the documentation introduces markdown usage.', engine: 'mdx-js', order: 1 },
      },
    ],
    frontmatter: { title: 'Getting Started', order: 1 },
  },
  { type: 'category', path: '/i18n', children: [], frontmatter: { title: 'Internationalization', order: 4 } },
  {
    type: 'category',
    path: '/markdown',
    children: [
      {
        type: 'page',
        path: '/markdown/engines',
        content: {
          type: 'file-system',
          file_path: 'src/assets/content/default/markdown/engines.mdx',
          source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
        },
        frontmatter: { title: 'Engines', description: 'This part of the documentation introduces markdown usage.', engine: 'mdx-js', order: 2 },
      },
      {
        type: 'page',
        path: '/markdown/mdx',
        content: {
          type: 'file-system',
          file_path: 'src/assets/content/default/markdown/mdx.mdx',
          source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
        },
        frontmatter: {
          title: 'MD.. MDX.. ?',
          description: 'This part of the documentation introduces markdown usage.',
          engine: 'markdown-it',
          order: 1,
        },
      },
      {
        type: 'category',
        path: '/markdown/syntax',
        children: [
          {
            type: 'category',
            path: '/markdown/syntax/advanced',
            children: [
              {
                type: 'page',
                path: '/markdown/syntax/advanced/code-blocks',
                content: {
                  type: 'file-system',
                  file_path: 'src/assets/content/default/markdown/syntax/advanced/code-blocks.mdx',
                  source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
                },
                frontmatter: { title: 'Code Block', description: 'Learn the Markdown syntax about code blocks.', order: 2 },
              },
              {
                type: 'page',
                path: '/markdown/syntax/advanced/latex',
                content: {
                  type: 'file-system',
                  file_path: 'src/assets/content/default/markdown/syntax/advanced/latex.mdx',
                  source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
                },
                frontmatter: { title: 'LaTeX', description: 'No description.', engine: 'marked', order: 3 },
              },
              {
                type: 'page',
                path: '/markdown/syntax/advanced/mermaid-diagrams',
                content: {
                  type: 'file-system',
                  file_path: 'src/assets/content/default/markdown/syntax/advanced/mermaid-diagrams.mdx',
                  source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
                },
                frontmatter: { title: 'Mermaid Diagrams', description: 'Learn the Markdown syntax about mermaid diagrams.', order: 1 },
              },
            ],
            frontmatter: { title: 'Advanced' },
          },
          {
            type: 'page',
            path: '/markdown/syntax/blockquote',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/markdown/syntax/blockquote.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'Block quotes', description: 'Learn the Markdown syntax about block quotes.' },
          },
          {
            type: 'page',
            path: '/markdown/syntax/emphasis',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/markdown/syntax/emphasis.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'Emphasis', description: 'Learn the Markdown syntax about emphasis.' },
          },
          {
            type: 'page',
            path: '/markdown/syntax/headings',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/markdown/syntax/headings.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'Headings', description: 'Add titles in your page.', engine: 'markdown-it' },
          },
          {
            type: 'page',
            path: '/markdown/syntax/images',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/markdown/syntax/images.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'Images', description: 'Add funny memes to your documentation' },
          },
          {
            type: 'page',
            path: '/markdown/syntax/lists',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/markdown/syntax/lists.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'Lists', description: 'Organize content with ordered, unordered and task lists.', engine: 'markdown-it' },
          },
        ],
        frontmatter: { title: 'Syntax', order: 4 },
      },
    ],
    frontmatter: { title: 'Markdown', order: 3 },
  },
  {
    type: 'category',
    path: '/routing',
    children: [
      {
        type: 'page',
        path: '/routing/configuration',
        content: {
          type: 'file-system',
          file_path: 'src/assets/content/default/routing/configuration.mdx',
          source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
        },
        frontmatter: { title: 'Configuration', description: 'Meet sleetch sources to feed your documentation.', engine: 'mdx-js', order: 1 },
      },
      {
        type: 'category',
        path: '/routing/sources',
        children: [
          {
            type: 'page',
            path: '/routing/sources/cms',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/routing/sources/cms.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'CMS', description: 'CMS source integration setup and structure instructions.', engine: 'mdx-js' },
          },
          {
            type: 'page',
            path: '/routing/sources/file-system',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/routing/sources/file-system.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: { title: 'File System', description: 'File System source integration setup and structure instructions.', engine: 'mdx-js' },
          },
          {
            type: 'page',
            path: '/routing/sources/git-file-system',
            content: {
              type: 'file-system',
              file_path: 'src/assets/content/default/routing/sources/git-file-system.mdx',
              source_id: 'file-system:b12c9898-877c-4b41-8cb9-17c5c0acc0fd',
            },
            frontmatter: {
              title: 'Git File System',
              description: 'Git File System source integration setup and structure instructions.',
              engine: 'mdx-js',
            },
          },
        ],
        frontmatter: { title: 'Sources' },
      },
    ],
    frontmatter: { title: 'Routing', order: 2 },
  },
  { type: 'category', path: '/styling', children: [], frontmatter: { title: 'Styling', order: 6 } },
];
