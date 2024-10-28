import { defineStore } from 'pinia';
import { Article } from '../types/Article.ts';
import { useArticleStore } from './articleStore';

interface SearchState {
  searchQuery: string;
  filteredArticles: Article[];
}

const defaultState: SearchState = {
  searchQuery: '',
  filteredArticles: [],
}

const checkArticleByFilter = (query: string, article: Article) => {
  return [article.id, article.markdown, article.name].some((field) => field.includes(query))
}

export const useSearchStore = defineStore('searchArticles', {
  state: (): SearchState => defaultState,
  actions: {
    setQuery(query: string) {
      const articlesStore = useArticleStore();
      this.searchQuery = query;
      const foundArticles = articlesStore.articles.filter((article) => checkArticleByFilter(query, article))
      this.filteredArticles = foundArticles
    },
  },
});

