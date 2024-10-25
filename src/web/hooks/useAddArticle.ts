import { ref } from "vue";
import { useArticleStore } from "../store";
import { v4 as uuidv4 } from 'uuid';
import parseWebpage from '../api/parseWebpage';

export const useAddArticle = () => {
  const articleUrl = ref<string>('')
  const articleStore = useArticleStore();

  const getArticle = async (url: string) => {
    const page = await parseWebpage(url)
    if (page) {
      articleStore.addArticle({ ...page, id: uuidv4(), originalUrl: url })
    }
  }
  
  const addArticle = () => {
    if (articleUrl.value) {
      getArticle(articleUrl.value)
      articleUrl.value = ''
    }
  }

  return { articleUrl, addArticle }
}