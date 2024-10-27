import { defineStore } from 'pinia';
import { Article, ViewVariant } from '../types/Article';
import { useSettingsStore } from './settingsStore';
import { useFoldersStore } from './foldersStore';
import { StateWithInitialization } from './types'
import { isDesktopApp } from '../utils/isDesktopApp'
import { ParseitFile } from '../../common/types';

interface ArticleState extends StateWithInitialization {
  articles: Article[],
  selectedArticle: Article | null,
  articleView: ViewVariant,
}

const convertParseitFileToArticle = (file: ParseitFile): Article => {
  return {
    id: file.filePath,
    name: file.name,
    markdown: file.content,
    filePath: file.filePath,
  }
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
        const foldersStore = useFoldersStore();
        if (foldersStore.selectedFolder) {
          const files = await window.api.getAllFiles(foldersStore.selectedFolder.folderPath);
          const articles: Article[] = files.map(convertParseitFileToArticle) 
          this.articles = articles
        }
      }
      this._initialized = true;
    },
    addArticle(article: Article) {
      this.articles.push(article);
    },
    createArticle(name: string, content: string) {
      if (isDesktopApp()) {
          window.api.createAppFile(name, content)
      }
    },
    removeArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.deleteFile(article.filePath);
      } else {
        this.articles = this.articles.filter(a => a.id !== article.id)
        if (this.selectedArticle?.id === article.id) {
          this.selectedArticle = null;
        }
      }
    },
    updateArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.writeFile(article.filePath, article.markdown)
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

