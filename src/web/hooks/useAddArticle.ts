import yaml from 'js-yaml'
import parseWebpage from 'src/web/api/parseWebpage'
import { useArticleStore } from 'src/web/stores/articleStore'
import { ParsedWebpage } from 'src/web/types/ParsedWebpage'
import TurndownService from 'turndown'
import { ref } from 'vue'

function createMarkdownWithYaml(metadata, content) {
  const yamlContent = yaml.dump(metadata)
  return `---\n${yamlContent}---\n\n${content}`
}

const convertParsedWebpageToMarkdown = (page: ParsedWebpage): string => {
  const turndownService = new TurndownService({ headingStyle: 'atx' })
  const markdown = turndownService.turndown(page.content)
  const meta = {
    url: page.originalUrl,
    faviconUrl: page.faviconUrl,
    domain: page.domain,
    createdAt: new Date().toISOString()
  }
  const withMeta = createMarkdownWithYaml(meta, markdown)
  return withMeta
}

export const useAddArticle = () => {
  const isLoading = ref(false)
  const articleUrl = ref<string>('')
  const articleStore = useArticleStore()

  const parsePageAndCreateArticle = async (url: string) => {
    const page = await parseWebpage(url)
    if (page) {
      const markdown = convertParsedWebpageToMarkdown(page)
      const name = page.title || page.excerpt || page.domain
      if (name) {
        articleStore.createArticle(name, markdown)
      } else {
        throw new Error('No name found for webpage')
      }
    }
  }

  const handleAddArticle = async () => {
    if (articleUrl.value) {
      isLoading.value = true
      await parsePageAndCreateArticle(articleUrl.value)
      isLoading.value = false
      articleUrl.value = ''
    }
  }

  return {
    articleUrl,
    addArticle: handleAddArticle,
    parsePageAndCreateArticle,
    isLoading
  }
}
