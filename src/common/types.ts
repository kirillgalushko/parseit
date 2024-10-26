export interface Settings {
  theme: 'dark' | 'light',
  vaultPath: string | null,
}

export interface ParseitFile {
  name: string;
  filePath: string;
  content: string;
  extension: string;
}
