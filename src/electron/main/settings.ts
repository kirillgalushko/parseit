import { ipcMain  } from 'electron';
import Store from 'electron-store';
import { Settings } from '../../common/types.ts'
import { defaultAppSettings } from '../../common/constants.ts'

const store = new Store<Settings>({
  defaults: defaultAppSettings,
});

export const getSettings = () => {
  return store.store
}

export const setSettings = (settings) => {
  store.store = settings
}

export default () => {
  ipcMain.handle('get-settings', getSettings);
  ipcMain.handle('set-settings', (_event, settings) => setSettings(settings));
}
