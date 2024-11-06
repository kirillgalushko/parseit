import yaml from 'js-yaml'
import { defineStore } from 'pinia'
import { ARCHIVE_DIR_NAME } from 'src/common/constants'
import { ParseitFile } from 'src/common/types'
import { useFoldersStore } from 'src/web/stores/foldersStore'
import { StateWithInitialization } from 'src/web/stores/types'
import { Article, ViewVariant } from 'src/web/types/Article'

interface ArticleState extends StateWithInitialization {
  articles: Article[]
  selectedArticle: Article | null
  articleView: ViewVariant
}

function parseMarkdownWithYaml(content: string) {
  const match = content.match(/^-{3}\r?\n([\s\S]*?)\r?\n-{3}/)
  if (!match) {
    return { meta: null, content }
  }
  const yamlContent = match[1]
  const body = content.replace(match[0], '').trim()
  const meta = yaml.load(yamlContent)
  return { meta, body }
}

const convertParseitFileToArticle = (file: ParseitFile): Article => {
  const { meta, body } = parseMarkdownWithYaml(file.content)
  return {
    id: file.filePath,
    name: file.name,
    markdown: file.content,
    filePath: file.filePath,
    body: body || file.content,
    excerpt: (body || file.content).slice(0, 250),
    url: meta?.url,
    faviconUrl: meta?.faviconUrl,
    domain: meta?.domain,
    createdAt: meta?.createdAt,
    author: meta?.author,
    siteName: meta?.siteName
  }
}

export const useArticleStore = defineStore('articleStore', {
  state: (): ArticleState => ({
    articles: [] as Article[],
    selectedArticle: null,
    articleView: 'reader',
    _initialized: false
  }),
  actions: {
    async init() {
      const foldersStore = useFoldersStore()
      if (foldersStore.selectedFolder) {
        const files = await window.api.getAllFiles(foldersStore.selectedFolder.folderPath)
        const articles: Article[] = files.map(convertParseitFileToArticle)
        this.articles = articles
      }
      this._initialized = true
    },
    async updateArticles() {
      const foldersStore = useFoldersStore()
      if (foldersStore.selectedFolder) {
        const files = await window.api.getAllFiles(foldersStore.selectedFolder.folderPath)
        const articles: Article[] = files.map(convertParseitFileToArticle)
        this.articles = articles
      }
      const newSelectedArticle = this.articles.find((a) => a.id === this.selectedArticle?.id)
      if (this.selectedArticle && newSelectedArticle) {
        this.selectedArticle = newSelectedArticle
      } else {
        this.selectedArticle = null
      }
    },
    addArticle(article: Article) {
      this.articles.push(article)
    },
    createArticle(name: string, content: string) {
      const foldersStore = useFoldersStore()
      if (foldersStore.selectedFolder?.folderPath.includes(ARCHIVE_DIR_NAME)) {
        window.api.createAppFile(name, content)
      } else {
        window.api.createAppFile(name, content, foldersStore.selectedFolder?.name)
      }
    },
    async removeArticle(article: Article) {
      return window.api.deleteFile(article.filePath)
    },
    async archiveArticle(article: Article) {
      return window.api.archiveFile(article.filePath)
    },
    async recoverArticle(article: Article) {
      return window.api.recoverFile(article.filePath)
    },
    async updateArticle(article: Article) {
      return window.api.writeFile(article.filePath, article.markdown)
    },
    setSelectedArticle(article: Article | null) {
      this.selectedArticle = article
    },
    setArticleView(articleView: ViewVariant) {
      this.articleView = articleView
    }
  }
})
