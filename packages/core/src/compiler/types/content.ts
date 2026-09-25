import type { cloud_content } from "../lib/sources/cloud";
import type { file_system_content } from "../lib/sources/file-system";
import type { git_file_system_content } from "../lib/sources/git-file-system";

export type content =
	cloud_content | file_system_content | git_file_system_content;
