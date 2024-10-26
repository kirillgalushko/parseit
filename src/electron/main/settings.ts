import { ipcMain  } from 'electron';
import Store from 'electron-store';
import { Settings, defaultAppSettings } from '../../common/types.ts'

const store = new Store<Settings>({
  defaults: defaultAppSettings,
});

export const getSettings = () => {
  return store.store
}

export const setSettings = (_event, settings) => {
  store.store = settings
}

export default () => {
  ipcMain.handle('get-settings', getSettings);
  ipcMain.handle('set-settings', setSettings);
}
