import type { tree_object } from '@sleetch/core/compiler';
import type { path_transformer } from '@sleetch/core/configuration';
import { type BaseHTMLAttributes, createContext, type ReactNode, useContext, useState } from 'react';

type sidebar_context = {
    is_sidebar_open: boolean;
    toggle_sidebar: () => void;
    close_sidebar: () => void;
};

type general_context = {
    path_transformer: path_transformer<string>;
    icon_transformer: (icon?: string) => ReactNode;
    current_path?: string;
    set_current_path: (current_path: general_context['current_path']) => void;
    tree: tree_object[];
    set_tree: (tree: general_context['tree']) => void;
    language: string;
    set_language: (language: general_context['language']) => void;
};

type documentation_context = sidebar_context & general_context;

export const DocumentationContext = createContext<documentation_context | null>(null);

export function useDocumentationContext() {
    const context = useContext(DocumentationContext);
    if (!context) throw new Error('useDocumentationContext must be used within DocumentationProvider');
    return context;
}

export interface DocumentationProviderProps extends BaseHTMLAttributes<HTMLDivElement> {
    path_transformer?: general_context['path_transformer'];
    icon_transformer?: general_context['icon_transformer'];
    tree: general_context['tree'];
    language: general_context['language'];
    current_path?: general_context['current_path'];
}

export function DocumentationProvider({
    children,
    className,
    path_transformer = ({ path }) => path,
    icon_transformer = (_icon) => null,
    tree: tree_value,
    language: language_value,
    current_path: current_path_value,
    ...props
}: DocumentationProviderProps) {
    const [is_sidebar_open, set_is_sidebar_open] = useState(false);
    const [tree, set_tree] = useState<tree_object[]>(tree_value);
    const [language, set_language] = useState<string>(language_value);
    const [current_path, set_current_path] = useState<string | undefined>(current_path_value);

    const toggle_sidebar = () => set_is_sidebar_open((prev) => !prev);
    const close_sidebar = () => set_is_sidebar_open(false);

    return (
        <DocumentationContext.Provider
            value={{
                is_sidebar_open,
                toggle_sidebar,
                close_sidebar,
                path_transformer,
                icon_transformer,
                tree,
                language,
                set_tree,
                set_language,
                current_path,
                set_current_path,
            }}
        >
            {children}
        </DocumentationContext.Provider>
    );
}
