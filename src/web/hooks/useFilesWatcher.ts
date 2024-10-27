import { isDesktopApp } from "../utils/isDesktopApp";
import { useArticleStore } from "../stores/articleStore"
import { onMounted, watch } from "vue";
import { useFoldersStore } from "../stores/foldersStore";

export const useFilesWatcher = () => {
  const foldersStore = useFoldersStore();
  const articleStore = useArticleStore();

  const watchChanges = () => {
    window.api.onFilesUpdated(() => {
      foldersStore.init();
      articleStore.init();
    })
  }

  watch(() => foldersStore.selectedFolder, () => {
    articleStore.init();
  })

  onMounted(() => {
    if (isDesktopApp()) {
      watchChanges();
    }
  })
}