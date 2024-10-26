import { contextBridge, ipcRenderer  } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  getAllFiles: (directory) => ipcRenderer.invoke('get-all-files', directory),
  onFilesUpdated: (callback) => {
    ipcRenderer.on('files-updated', (_event, data) => callback(data));
  },
  createAppVault: () => ipcRenderer.invoke('create-app-vault'),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setSettings: (settings: Object) => ipcRenderer.invoke('set-settings', settings),
}
 
try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
