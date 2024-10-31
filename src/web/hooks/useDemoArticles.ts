import { useAddArticle } from 'src/web/hooks/useAddArticle'
import { useArticleStore } from 'src/web/stores/articleStore'
import { onMounted, watch } from 'vue'

const urls = [
  'https://vuejs.org/guide/essentials/lifecycle.html',
  'https://vite.dev/guide/why.html',
  'https://react.dev/learn/thinking-in-react'
]

export const useDemoArticles = () => {
  const articleStore = useArticleStore()
  const { parsePageAndCreateArticle } = useAddArticle()

  watch(
    () => articleStore.articles.length,
    () => {
      if (!articleStore.selectedArticle && articleStore.articles[0]) {
        articleStore.setSelectedArticle(articleStore.articles[0])
      }
    }
  )

  const fetchArticles = async () => {
    for (const url of urls) {
      parsePageAndCreateArticle(url)
    }
  }

  onMounted(() => {
    fetchArticles()
  })
}
