export interface Settings {
  theme: 'dark' | 'light',
  vaultPath: string | null,
}

export const defaultAppSettings: Settings = {
  vaultPath: null,
  theme: 'dark'
}