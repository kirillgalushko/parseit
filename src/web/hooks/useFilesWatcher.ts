import { useArticleStore } from "../stores/articleStore"
import { onMounted } from "vue";

export const useFilesWatcher = () => {
  const articleStore = useArticleStore();

  const watchChanges = () => {
    window.api.onFilesUpdated(() => {
      articleStore.init();
    })
  }

  onMounted(() => {
    watchChanges();
  })
}