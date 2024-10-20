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
    setSelectedArticle(article: Article) {
      this.selectedArticle = article;
    },
  },
});
