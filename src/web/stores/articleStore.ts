import { defineStore } from 'pinia';
import { Article, ViewVariant } from '../types/Article';
import { useSettingsStore } from './settingsStore';
import { StateWithInitialization } from './types'
import { v4 as uuidv4 } from 'uuid';

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
      const settings = useSettingsStore();
      const files = await window.api.getAllFiles(settings.vaultPath);
      const articles: Article[] = files.map(file => ({ id: uuidv4(), markdown: file.content })) 
      this.articles = articles
      this._initialized = true;
    },
    addArticle(article: Article) {
      this.articles.push(article);
    },
    removeArticle(article: Article) {
      this.articles = this.articles.filter(a => a.id !== article.id)
      if (this.selectedArticle?.id === article.id) {
        this.selectedArticle = null;
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

