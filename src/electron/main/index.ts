import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow } from 'electron'
import filesModule from 'src/electron/main/files.ts'
import htmlModule from 'src/electron/main/html.ts'
import settingsModule from 'src/electron/main/settings.ts'
import sync from 'src/electron/main/sync.ts'
import vaultModule from 'src/electron/main/vault.ts'
import { createWindow } from 'src/electron/main/window.ts'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  filesModule()
  vaultModule()
  settingsModule()
  htmlModule()
  sync.subscribe()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  sync.unsubscribe()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
