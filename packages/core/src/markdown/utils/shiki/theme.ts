import type { ThemeRegistration } from 'shiki';

export const shiki_theme: ThemeRegistration = {
	name: 'sleetch',
	type: 'dark',
	colors: {
		'editor.background': 'var(--_sleetch-color-card)',
		'editor.foreground': 'var(--_sleetch-color-text)',
	},
	settings: [
		{
			scope: ['support.function', 'entity.name.function', 'meta.function-call'],
			settings: { foreground: 'var(--_sleetch-syntax-function)' },
		},
		{ settings: { foreground: 'var(--_sleetch-color-text)' } },
		{
			scope: ['keyword', 'storage.type', 'storage.modifier', 'keyword.control'],
			settings: { foreground: 'var(--_sleetch-syntax-keyword)' },
		},
		{
			scope: ['string', 'string.quoted', 'string.template'],
			settings: { foreground: 'var(--_sleetch-syntax-string)' },
		},
		{
			scope: ['comment', 'punctuation.definition.comment'],
			settings: { foreground: 'var(--_sleetch-syntax-comment)', fontStyle: 'italic' },
		},
		{
			scope: ['constant.numeric'],
			settings: { foreground: 'var(--_sleetch-syntax-number)' },
		},
		{
			scope: ['support.function', 'entity.name.function', 'meta.function-call'],
			settings: { foreground: 'var(--_sleetch-syntax-title)' },
		},
		{
			scope: ['support.type', 'support.class'],
			settings: { foreground: 'var(--_sleetch-syntax-built-in)' },
		},
		{
			scope: ['entity.name.class', 'entity.other.inherited-class'],
			settings: { foreground: 'var(--_sleetch-syntax-class)' },
		},
		{
			scope: ['variable', 'variable.parameter', 'variable.other'],
			settings: { foreground: 'var(--_sleetch-syntax-variable)' },
		},
		{
			scope: ['keyword.operator'],
			settings: { foreground: 'var(--_sleetch-syntax-operator)' },
		},
		{
			scope: ['punctuation'],
			settings: { foreground: 'var(--_sleetch-syntax-punctuation)' },
		},
		{
			scope: ['entity.name.tag'],
			settings: { foreground: 'var(--_sleetch-syntax-tag)' },
		},
		{
			scope: ['entity.other.attribute-name'],
			settings: { foreground: 'var(--_sleetch-syntax-attr)' },
		},
		{
			scope: ['constant.language', 'constant.character', 'support.constant'],
			settings: { foreground: 'var(--_sleetch-syntax-literal)' },
		},
		{
			scope: ['meta', 'meta.tag'],
			settings: { foreground: 'var(--_sleetch-syntax-meta)' },
		},
		{
			scope: ['markup.deleted', 'diff.deleted'],
			settings: { foreground: 'var(--_sleetch-syntax-deletion)' },
		},
		{
			scope: ['markup.inserted', 'diff.inserted'],
			settings: { foreground: 'var(--_sleetch-syntax-addition)' },
		},
		{
			scope: ['markup.italic', 'emphasis'],
			settings: { foreground: 'var(--_sleetch-syntax-emphasis)', fontStyle: 'italic' },
		},
		{
			scope: ['markup.bold', 'strong'],
			settings: { foreground: 'var(--_sleetch-syntax-strong)', fontStyle: 'bold' },
		},
	],
};
