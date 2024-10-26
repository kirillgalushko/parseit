import { contextBridge, ipcRenderer  } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  createAppVault: () => ipcRenderer.invoke('create-app-vault'),
}
 
try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
