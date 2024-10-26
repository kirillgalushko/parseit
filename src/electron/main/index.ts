import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './window.ts'
import filesModule from './files.ts'
import vaultModule from './vault.ts'
import settingsModule from './settings.ts'
import sync from './sync.ts'
import htmlModule from './html.ts'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  filesModule();
  vaultModule();
  settingsModule();
  htmlModule();
  sync.subscribe();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  sync.unsubscribe();

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
