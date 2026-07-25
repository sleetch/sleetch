export type file_system_content = {
  type: 'file-system';
  file_path: string;
};

export type git_content = {
  type: 'git';
  file_url: string;
};

export type content = git_content | file_system_content;
