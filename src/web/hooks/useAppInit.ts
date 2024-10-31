import { useArticleStore } from 'src/web/stores/articleStore'
import { useFoldersStore } from 'src/web/stores/foldersStore'
import { useSettingsStore } from 'src/web/stores/settingsStore'
import { onMounted, ref } from 'vue'

export const useAppInit = () => {
  const settingsStore = useSettingsStore()
  const foldersStore = useFoldersStore()
  const articleStore = useArticleStore()
  const stores = [settingsStore, foldersStore, articleStore]
  const isInitialized = ref<boolean>(false)

  const initAllStores = async () => {
    for (const store of stores) {
      if (!store._initialized) {
        await store.init()
      }
    }
    isInitialized.value = true
  }

  onMounted(() => initAllStores())
  return { isInitialized }
}
