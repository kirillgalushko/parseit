import { defineStore } from 'pinia';
import { Settings as AppSettings, defaultAppSettings } from '../../common/types';

interface Settings extends AppSettings {
  _initialized: boolean;
}

const defaultSettings: Settings = {
  _initialized: false,
  ...defaultAppSettings,
}

const prepareState = (settings: Settings) => {
  return Object.fromEntries(
    Object.entries(settings).filter(([key]) => !key.startsWith('_'))
  );
}

export const useSettingsStore = () => {
  const store = defineStore('settings', {
    state: (): Settings => defaultSettings,
    actions: {
      async updateSettings() {
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

  const settingsStore = store()
	if (!settingsStore._initialized) {
		settingsStore.updateSettings()
	}

	return settingsStore
}

