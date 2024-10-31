<script setup lang="ts">
import { Button, Stack, Tabs, Tab, Icon, Separator, Tooltip } from 'gui'
import { useArticleStore } from 'src/web/stores/articleStore'
import { ViewVariant } from 'src/web/types/Article'
import { isArchivedArticle } from 'src/web/utils/isArchive'

const articleStore = useArticleStore()

const onChangeViewVariant = (variant: string) => {
  articleStore.setArticleView(variant as ViewVariant)
}

const handleOpenPage = () => {
  window.open(articleStore.selectedArticle?.url, '_blank')
}

const handleRemoveArticle = () => {
  if (articleStore.selectedArticle) {
    articleStore.removeArticle(articleStore.selectedArticle)
  }
}

const handleArchiveArticle = () => {
  if (articleStore.selectedArticle) {
    articleStore.archiveArticle(articleStore.selectedArticle)
  }
}

const handleRecoverArticle = () => {
  if (articleStore.selectedArticle) {
    articleStore.recoverArticle(articleStore.selectedArticle)
  }
}

const handleCloseArticle = () => {
  articleStore.setSelectedArticle(null)
}

const isInArchive = isArchivedArticle(articleStore.selectedArticle)
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

const actions = [
  {
    type: 'button',
    name: 'Открыть в новой вкладке',
    icon: 'external-link',
    actionHandler: handleOpenPage
  },
  archiveAction,
  {
    type: 'button',
    name: 'Удалить',
    icon: 'trash',
    actionHandler: handleRemoveArticle
  },
  { type: 'separator' },
  {
    type: 'button',
    name: 'Закрыть',
    icon: 'x',
    actionHandler: handleCloseArticle
  }
]
</script>

<template>
  <div :class="['toolbar']">
    <Stack alignItems="center" direction="row" :gap="2">
      <Tabs :value="articleStore.articleView" :onChange="onChangeViewVariant">
        <Tab name="reader">Режим чтения</Tab>
        <Tab name="editor">Редактор</Tab>
      </Tabs>
    </Stack>
    <Stack alignItems="center" direction="row" :gap="2">
      <div v-for="action in actions">
        <template v-if="action.type === 'button'">
          <Tooltip>
            <Button @click="action.actionHandler" mode="ghost" squared>
              <Icon :name="action.icon" v-if="action.icon" />
            </Button>
            <template #popper>
              {{ action.name }}
            </template>
          </Tooltip>
        </template>
        <template v-if="action.type === 'separator'">
          <Separator direction="vertical" />
        </template>
      </div>
    </Stack>
  </div>
</template>

<style scoped>
.toolbar {
  border-bottom: 1px solid hsl(var(--border));
  padding: var(--gap-2) var(--gap-4);
  height: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
}
</style>
