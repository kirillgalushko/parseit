import { getMainWindow, watchDirectory } from './utils.ts';
import { getSettings } from './settings.ts'

let watcher;

const sendFilesUpdatedEvent = () => {
  const mainWindow = getMainWindow();
  mainWindow.webContents.send('files-updated');
}

const subscribe = () => {
  const directoryToWatch = getSettings().vaultPath
  if (!directoryToWatch) throw new Error('No vault found')
  watcher = watchDirectory(directoryToWatch, () => {
    sendFilesUpdatedEvent();
  })
}

const unsubscribe = () => {
  watcher?.close();
}

export default {
  subscribe,
  unsubscribe,
}