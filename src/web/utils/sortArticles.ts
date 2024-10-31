import { Sorting } from 'src/web/stores/searchStore'
import { Article } from 'src/web/types/Article'

export function sortArticles(articles: Article[], sortingType: Sorting): Article[] {
  return [...articles].sort((a, b) => {
    switch (sortingType) {
      case Sorting.Atoz:
        return a.name.localeCompare(b.name)
      case Sorting.Ztoa:
        return b.name.localeCompare(a.name)
      case Sorting.Newest: {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      }
      case Sorting.Oldest: {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateA - dateB
      }
      default:
        return 0
    }
  })
}
