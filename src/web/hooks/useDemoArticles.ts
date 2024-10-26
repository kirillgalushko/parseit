import { onMounted, watch } from 'vue'
import parseWebpage from '../api/parseWebpage';
import { useArticleStore } from '../stores/articleStore';

const urls = [
  'https://vuejs.org/guide/essentials/lifecycle.html',
  'https://vite.dev/guide/why.html',
  'https://react.dev/learn/thinking-in-react'
]

export const useDemoArticles = () => {
  const articleStore = useArticleStore();

  const getArticle = async (url: string) => {
    const page = await parseWebpage(url)
    if (page) {
      articleStore.addArticle({ ...page, id: String(urls.indexOf(url)), originalUrl: url })
    }
  }

  watch(() => articleStore.articles.length, () => {
    if (!articleStore.selectedArticle && articleStore.articles[0]) {
      articleStore.setSelectedArticle(articleStore.articles[0]);
    }
  });
  
  const fetchArticles = async () => {
    for (const url of urls) {
      getArticle(url)
    }
  }
  
  onMounted(() => {
    fetchArticles()
  })
}
