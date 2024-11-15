import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { shell, BrowserWindow } from 'electron'

export function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: join(__dirname, '../../public/icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
