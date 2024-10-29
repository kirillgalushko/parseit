import { defineStore } from 'pinia';
import { Article } from '../types/Article.ts';
import { useArticleStore } from './articleStore';

export enum Sorting {
  Newest = 'newest',
  Oldest = 'oldest',
  Atoz = 'atoz',
  Ztoa = 'ztoa',
}

interface SearchState {
  searchQuery: string;
  filteredArticles: Article[];
  sorting: Sorting;
}

const defaultState: SearchState = {
  searchQuery: '',
  filteredArticles: [],
  sorting: Sorting.Newest,
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
    setSorting(sorting: Sorting) {
      this.sorting = sorting
    },
  },
});

