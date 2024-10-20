import { defineStore } from 'pinia';
import { Article } from './types/Article';

interface ArticleState {
  articles: Article[],
  selectedArticle: Article | null,
}

export const useArticleStore = defineStore('articleStore', {
  state: (): ArticleState => ({
    articles: [],
    selectedArticle: null,
  }),
  actions: {
    addArticle(article: Article) {
      this.articles.push(article);
    },
    removeArticle(article: Article) {
      this.articles = this.articles.filter(a => a.id !== article.id)
      if (this.selectedArticle?.id === article.id) {
        this.selectedArticle = null;
      }
    },
    setSelectedArticle(article: Article) {
      this.selectedArticle = article;
    },
  },
});
