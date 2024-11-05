import { AppTheme } from 'src/common/types'
import { useSettingsStore } from 'src/web/stores/settingsStore'
import { watch, onMounted, onUnmounted } from 'vue'

const getThemeName = (theme: AppTheme) => {
  return `${theme}-theme`
}

export function useAppTheme() {
  const settingsStore = useSettingsStore()

  const updateBodyClass = () => {
    document.body.classList.remove('light-theme', 'dark-theme')
    document.body.classList.add(getThemeName(settingsStore.theme))
  }

  watch(() => settingsStore.theme, updateBodyClass, { immediate: true })

  onMounted(updateBodyClass)

  onUnmounted(() => {
    document.body.classList.remove(getThemeName(settingsStore.theme))
  })
}
