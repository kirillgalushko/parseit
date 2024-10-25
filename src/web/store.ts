import { defineStore } from 'pinia';
import { Article, ViewVariant } from './types/Article';

interface ArticleState {
  articles: Article[],
  selectedArticle: Article | null,
  articleView: ViewVariant,
}

export const useArticleStore = defineStore('articleStore', {
  state: (): ArticleState => ({
    articles: [],
    selectedArticle: null,
    articleView: 'reader',
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
    setSelectedArticle(article: Article | null) {
      this.selectedArticle = article;
    },
    setArticleView(articleView: ViewVariant) {
      this.articleView = articleView;
    },
  },
});
