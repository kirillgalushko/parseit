import { ElectronAPI } from '@electron-toolkit/preload'
import type { readFile, getAllFiles } from '../main/files'
import type { createAppVault } from '../main/vault'
import type { getSettings, setSettings } from '../main/settings'


declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readFile: readFile,
      getAllFiles: getAllFiles,
      createAppVault: createAppVault,
      getSettings: getSettings,
      setSettings: setSettings,
      onFilesUpdated: (callback: () => void) => void,
    }
  }
}
