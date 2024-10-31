import { ElectronAPI } from '@electron-toolkit/preload'
import type { readFile, getAllFiles, writeFile, deleteFile, getAllFolders, archiveFile, recoverFile } from 'src/electron/main/files'
import type { createAppVault, createParseitFile } from 'src/electron/main/vault'
import type { getSettings, setSettings } from 'src/electron/main/settings'
import type { fetchHtml } from 'src/electron/main/html'


declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readFile: typeof readFile,
      writeFile: typeof writeFile,
      deleteFile: typeof deleteFile,
      archiveFile: typeof archiveFile,
      recoverFile: typeof recoverFile,
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
