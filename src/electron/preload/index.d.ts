import { ElectronAPI } from '@electron-toolkit/preload'
import type { readFile } from '../main/files'
import type { createAppVault } from '../main/vault'
import type { getSettings, setSettings } from '../main/settings'


declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readFile: readFile,
      createAppVault: createAppVault,
      getSettings: getSettings,
      setSettings: setSettings,
    }
  }
}
