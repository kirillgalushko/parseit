import { ipcMain  } from 'electron';
import Store from 'electron-store';
import { Settings } from '../../common/types.ts'
import { defaultAppSettings } from '../../common/constants.ts'
import { isFolderExists } from './utils.ts'
import { eventBus } from './eventBus.ts';

const store = new Store<Settings>({
  defaults: defaultAppSettings,
});

export const getSettings = async () => {
  const settings = store.store
  if (store.store.vaultPath && !(await isFolderExists(store.store.vaultPath))) {
    settings.vaultPath = null
  }
  return settings
}

export const setSettings = (settings: Settings) => {
  store.store = settings
}

export const setSettingItem = <T extends keyof Settings>(key: T, value: Settings[T]) => {
  store.store[key] = value
}

eventBus.on('vault:created', async (vaultPath) => {
  setSettingItem('vaultPath', vaultPath)
});

export default () => {
  ipcMain.handle('get-settings', getSettings);
  ipcMain.handle('set-settings', (_event, settings) => setSettings(settings));
}
