import { useArticleStore } from 'src/web/stores/articleStore'
import { useFoldersStore } from 'src/web/stores/foldersStore'
import { isDesktopApp } from 'src/web/utils/isDesktopApp'
import { onMounted, watch } from 'vue'

export const useFilesWatcher = () => {
  const foldersStore = useFoldersStore()
  const articleStore = useArticleStore()

  const watchChanges = () => {
    window.api.onFilesUpdated(() => {
      foldersStore.updateFolders()
      articleStore.updateArticles()
    })
  }

  watch(
    () => foldersStore.selectedFolder,
    () => {
      articleStore.updateArticles()
    }
  )

  onMounted(() => {
    if (isDesktopApp()) {
      watchChanges()
    }
  })
}
