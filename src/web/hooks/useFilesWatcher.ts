import { isDesktopApp } from "src/web/utils/isDesktopApp";
import { useArticleStore } from "src/web/stores/articleStore";
import { onMounted, watch } from "vue";
import { useFoldersStore } from "src/web/stores/foldersStore";

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