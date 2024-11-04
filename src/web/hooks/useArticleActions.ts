import { useConfirm } from 'gui'
import { useArticleStore } from 'src/web/stores/articleStore'
import { Article } from 'src/web/types/Article'
import { isArchivedArticle } from 'src/web/utils/isArchive'
import { computed, Ref } from 'vue'

export const useArticleActions = (article: Ref<Article>) => {
  const articleStore = useArticleStore()
  const { confirm, ...confirmModalData } = useConfirm()

  const handleOpenPage = () => {
    window.open(article.value?.url, '_blank')
  }

  const handleRemoveArticle = async () => {
    if (article.value) {
      try {
        await confirm({
          title: 'Удалить статью?',
          description: 'Эти изменения нельзя будет отменить.'
        })
        articleStore.removeArticle(article.value)
      } catch (_) {
        // Canceled
      }
    }
  }

  const handleArchiveArticle = () => {
    if (article.value) {
      articleStore.archiveArticle(article.value)
    }
  }

  const handleRecoverArticle = () => {
    if (article.value) {
      articleStore.recoverArticle(article.value)
    }
  }

  const isInArchive = isArchivedArticle(article.value)
  const archiveAction = isInArchive
    ? ({
        type: 'button',
        name: 'Восстановить файл',
        icon: 'archive-off',
        actionHandler: handleRecoverArticle
      } as const)
    : ({
        type: 'button',
        name: 'Архивировать',
        icon: 'archive',
        actionHandler: handleArchiveArticle
      } as const)

  const isWithUrl = computed(() => Boolean(article.value?.url))
  const openPageAction = {
    type: 'button',
    name: 'Открыть в новой вкладке',
    icon: 'external-link',
    actionHandler: handleOpenPage
  }
  const actions = computed(() => [
    ...(isWithUrl.value ? [openPageAction] : []),
    archiveAction,
    {
      type: 'button',
      name: 'Удалить',
      icon: 'trash',
      actionHandler: handleRemoveArticle
    }
  ])
  return { actions, confirmModalData }
}
