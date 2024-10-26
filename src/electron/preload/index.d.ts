import { ElectronAPI } from '@electron-toolkit/preload'
import type { readFile, createAppVault } from '../main/files'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      readFile: readFile,
      createAppVault: createAppVault,
    }
  }
}
