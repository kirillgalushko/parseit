import { useConfirm } from '@gui/components'
import ArchiveIcon from '@gui/icons/outline/archive'
import RecoverIcon from '@gui/icons/outline/archive-off'
import LinkIcon from '@gui/icons/outline/external-link'
import TrashIcon from '@gui/icons/outline/trash'
import { useArticleStore } from 'src/web/stores/articleStore'
import { Article } from 'src/web/types/Article'
import { isArchivedArticle } from 'src/web/utils/isArchive'
import { computed, Ref } from 'vue'

export const useArticleActions = (article: Ref<Article | null>) => {
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
        icon: RecoverIcon,
        actionHandler: handleRecoverArticle
      } as const)
    : ({
        type: 'button',
        name: 'Архивировать',
        icon: ArchiveIcon,
        actionHandler: handleArchiveArticle
      } as const)

  const isWithUrl = computed(() => Boolean(article.value?.url))
  const openPageAction = {
    type: 'button',
    name: 'Открыть в новой вкладке',
    icon: LinkIcon,
    actionHandler: handleOpenPage
  }
  const actions = computed(() => [
    ...(isWithUrl.value ? [openPageAction] : []),
    archiveAction,
    {
      type: 'button',
      name: 'Удалить',
      icon: TrashIcon,
      actionHandler: handleRemoveArticle
    }
  ])
  return { actions, confirmModalData }
}
