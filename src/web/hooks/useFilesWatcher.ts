import { isDesktopApp } from "../utils/isDesktopApp";
import { useArticleStore } from "../stores/articleStore"
import { onMounted, watch } from "vue";
import { useFoldersStore } from "../stores/foldersStore";

export const useFilesWatcher = () => {
  const foldersStore = useFoldersStore();
  const articleStore = useArticleStore();

  const watchChanges = () => {
    window.api.onFilesUpdated(() => {
      foldersStore.updateFolders();
      articleStore.updateArticles();
    })
  }

  watch(() => foldersStore.selectedFolder, () => {
    articleStore.updateArticles();
  })

  onMounted(() => {
    if (isDesktopApp()) {
      watchChanges();
    }
  })
}