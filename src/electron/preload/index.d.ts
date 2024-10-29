import { ElectronAPI } from '@electron-toolkit/preload'
import type { readFile, getAllFiles, writeFile, deleteFile, getAllFolders, archiveFile } from '../main/files'
import type { createAppVault, createParseitFile } from '../main/vault'
import type { getSettings, setSettings } from '../main/settings'
import type { fetchHtml } from '../main/html'


declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readFile: typeof readFile,
      writeFile: typeof writeFile,
      deleteFile: typeof deleteFile,
      archiveFile: typeof archiveFile,
      getAllFiles: typeof getAllFiles,
      getAllFolders: typeof getAllFolders,
      createAppVault: typeof createAppVault,
      createAppFile: typeof createParseitFile,
      getSettings: typeof getSettings,
      setSettings: typeof setSettings,
      fetchHtml: typeof fetchHtml,
      onFilesUpdated: (callback: () => void) => void,
    }
  }
}
