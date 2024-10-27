import { useArticleStore } from "../stores/articleStore"
import { useSettingsStore } from "../stores/settingsStore"
import { useFoldersStore } from '../stores/foldersStore'
import { onMounted, ref } from "vue";

export const useAppInit = () => {
  const settingsStore = useSettingsStore()
  const foldersStore = useFoldersStore();
  const articleStore = useArticleStore();
  const stores = [settingsStore, foldersStore, articleStore]
  const isInitialized = ref<boolean>(false)

  const initAllStores = async () => {
    for (const store of stores) {
      if (!store._initialized) {
        await store.init();
      }
    }
    isInitialized.value = true
  }
  
  onMounted(() => initAllStores())
  return { isInitialized }
}