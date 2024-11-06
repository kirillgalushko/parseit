import { defineStore } from 'pinia'
import { defaultAppSettings } from 'src/common/constants.ts'
import { Settings as AppSettings } from 'src/common/types'
import { StateWithInitialization } from 'src/web/stores/types'

type Settings = AppSettings & StateWithInitialization

const defaultSettings: Settings = {
  _initialized: false,
  ...defaultAppSettings
}

const prepareState = (settings: Settings) => {
  return Object.fromEntries(
    Object.entries(settings).filter(([key]) => !key.startsWith('_'))
  ) as Settings
}

export const useSettingsStore = defineStore('settings', {
  state: (): Settings => defaultSettings,
  actions: {
    async init() {
      const settings = await window.api.getSettings()
      this.$patch(settings)
      this._initialized = true
    },
    async saveSettings(newSettings: Settings) {
      await window.api.setSettings(prepareState(newSettings))
      this.$patch(newSettings)
    },
    async setSettingsItem<T extends keyof Settings>(key: T, value: Settings[T]) {
      const newSettings = {
        ...this.$state,
        [key]: value
      }
      await window.api.setSettings(prepareState(newSettings))
      this.$patch(newSettings)
    }
  }
})
