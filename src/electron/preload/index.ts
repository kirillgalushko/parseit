import { contextBridge, ipcRenderer  } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
  getAllFiles: (directory) => ipcRenderer.invoke('get-all-files', directory),
  getAllFolders: (directory) => ipcRenderer.invoke('get-all-folders', directory),
  onFilesUpdated: (callback) => {
    ipcRenderer.on('files-updated', (_event, data) => callback(data));
  },
  createAppVault: () => ipcRenderer.invoke('create-app-vault'),
  createAppFile: (fileName, content, folderName) => ipcRenderer.invoke('create-app-file', fileName, content, folderName),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setSettings: (settings: Object) => ipcRenderer.invoke('set-settings', settings),
  fetchHtml: (url) => ipcRenderer.invoke('fetch-html', url),
}
 
try {
  contextBridge.exposeInMainWorld('electron', electronAPI)
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
