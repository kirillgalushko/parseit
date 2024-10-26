import { defineStore } from 'pinia';
import { Article, ViewVariant } from '../types/Article';
import { useSettingsStore } from './settingsStore';
import { StateWithInitialization } from './types'
import { v4 as uuidv4 } from 'uuid';
import { isDesktopApp } from '../utils/isDesktopApp'

interface ArticleState extends StateWithInitialization {
  articles: Article[],
  selectedArticle: Article | null,
  articleView: ViewVariant,
}

export const useArticleStore = defineStore('articleStore', {
  state: (): ArticleState => ({
    articles: [],
    selectedArticle: null,
    articleView: 'reader',
    _initialized: false,
  }),
  actions: {
    async init() {
      if (isDesktopApp()) {
        const settings = useSettingsStore();
        const files = await window.api.getAllFiles(settings.vaultPath);
        const articles: Article[] = files.map(file => ({ id: uuidv4(), markdown: file.content, path: file.path })) 
        this.articles = articles
      }
      this._initialized = true;
    },
    addArticle(article: Article) {
      this.articles.push(article);
    },
    removeArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.deleteFile(article.path);
      } else {
        this.articles = this.articles.filter(a => a.id !== article.id)
        if (this.selectedArticle?.id === article.id) {
          this.selectedArticle = null;
        }
      }
    },
    updateArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.writeFile(article.path, article.markdown)
      } else {
        const changedArticleIndex = this.articles.findIndex(a => a.id === article.id)
        if (changedArticleIndex) {
          this.articles[changedArticleIndex] = article
        } 
      }
    },
    setSelectedArticle(article: Article | null) {
      this.selectedArticle = article;
    },
    setArticleView(articleView: ViewVariant) {
      this.articleView = articleView;
    },
  },
})

