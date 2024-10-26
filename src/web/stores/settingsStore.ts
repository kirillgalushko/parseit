import { defineStore } from 'pinia';
import { Settings as AppSettings, defaultAppSettings } from '../../common/types';
import { StateWithInitialization } from './types'

type Settings = AppSettings & StateWithInitialization

const defaultSettings: Settings = {
  _initialized: false,
  ...defaultAppSettings,
}

const prepareState = (settings: Settings) => {
  return Object.fromEntries(
    Object.entries(settings).filter(([key]) => !key.startsWith('_'))
  );
}

export const useSettingsStore = defineStore('settings', {
  state: (): Settings => defaultSettings,
  actions: {
    async init() {
      const settings = await window.api.getSettings();
      this.$patch(settings);
      this._initialized = true;
    },
    async saveSettings(newSettings: Settings) {
      await window.api.setSettings(prepareState(newSettings));
      this.$patch(newSettings);
    },
    async setSettingsItem<T extends keyof Settings>(key: T, value: Settings[T]) {
      const newSettings = {
        ...this.$state,
        [key]: value,
      }
      await window.api.setSettings(prepareState(newSettings));
      this.$patch(newSettings);
    }
  },
});

