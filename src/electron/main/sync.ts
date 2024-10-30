import { getMainWindow, watchDirectory } from './utils.ts';
import { getSettings } from './settings.ts'
import { eventBus } from './eventBus.ts';

let watcher;

const sendFilesUpdatedEvent = () => {
  const mainWindow = getMainWindow();
  mainWindow.webContents.send('files-updated');
}

const subscribe = async (vaultPath?: string) => {
  const directoryToWatch = vaultPath || (await getSettings()).vaultPath
  if (!directoryToWatch) throw new Error('No vault found')
  watcher = watchDirectory(directoryToWatch, () => {
    sendFilesUpdatedEvent();
  })
}

const unsubscribe = () => {
  watcher?.close();
}

eventBus.on('vault:created', async (vaultPath) => {
  subscribe(vaultPath);
  sendFilesUpdatedEvent();
});

export default {
  subscribe,
  unsubscribe,
}