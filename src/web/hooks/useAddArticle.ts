import yaml from 'js-yaml'
import parseWebpage from 'src/web/api/parseWebpage'
import TurndownService from 'turndown'
import { ref } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import { ParsedWebpage } from '../types/ParsedWebpage'

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

  const handleAddArticle = () => {
    if (articleUrl.value) {
      parsePageAndCreateArticle(articleUrl.value)
      articleUrl.value = ''
    }
  }

  return {
    articleUrl,
    addArticle: handleAddArticle,
    parsePageAndCreateArticle
  }
}
