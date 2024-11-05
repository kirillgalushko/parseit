export type AppTheme = 'dark' | 'light'

export interface Settings {
  theme: AppTheme
  vaultPath: string | null
}

export interface ParseitFile {
  name: string
  filePath: string
  content: string
  extension: string
}

export interface ParseitFolder {
  name: string
  folderPath: string
  filesCount: number
}
