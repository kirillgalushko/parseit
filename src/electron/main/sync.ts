import { eventBus } from 'src/electron/main/eventBus.ts'
import { getSettings } from 'src/electron/main/settings.ts'
import { getMainWindow, watchDirectory } from 'src/electron/main/utils.ts'

let watcher

const sendFilesUpdatedEvent = () => {
  const mainWindow = getMainWindow()
  mainWindow.webContents.send('files-updated')
}

const subscribe = async (vaultPath?: string) => {
  const directoryToWatch = vaultPath || (await getSettings()).vaultPath
  if (!directoryToWatch) throw new Error('No vault found')
  watcher = watchDirectory(directoryToWatch, () => {
    sendFilesUpdatedEvent()
  })
}

const unsubscribe = () => {
  watcher?.close()
}

eventBus.on('vault:created', async (vaultPath) => {
  subscribe(vaultPath)
  sendFilesUpdatedEvent()
})

export default {
  subscribe,
  unsubscribe
}
