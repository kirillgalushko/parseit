<script setup lang="ts">
import { Button, Stack, Tabs, Tab, Icon, Separator, Tooltip } from 'gui';
import { useArticleStore } from '../store';
import { ViewVariant } from '../types/Article';

const articleStore = useArticleStore();
const { selectedArticle, articleView } = articleStore

const onChangeViewVariant = (variant: string) => {
  articleStore.setArticleView(variant as ViewVariant)
}

const handleOpenPage = () => {
  window.open(selectedArticle?.originalUrl, '_blank');
}

const handleRemoveArticle = () => {
  if (selectedArticle) {
    articleStore.removeArticle(selectedArticle)
  }
}

const handleCloseArticle = () => {
  articleStore.setSelectedArticle(null)
}

const actions = [{
  type: 'button',
  name: 'Открыть в новой вкладке',
  icon: 'external-link',
  actionHandler: handleOpenPage,
}, {
  type: 'button',
  name: 'Удалить',
  icon: 'trash',
  actionHandler: handleRemoveArticle,
},
{ type: 'separator', },
{
  type: 'button',
  name: 'Закрыть',
  icon: 'x',
  actionHandler: handleCloseArticle,
}]
</script>

<template>
  <div :class="['toolbar']">
    <Stack alignItems="center" direction="row" :gap="2">
      <Tabs :value="articleView" :onChange="onChangeViewVariant">
        <Tab name="reader">Режим чтения</Tab>
        <Tab name="html">HTML</Tab>
      </Tabs>
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
  width: 100%;
  border-bottom: 1px solid hsl(var(--border));
  padding: var(--gap-3);
  padding-top: var(--gap-4);
  height: calc(40px + (var(--gap-3)));
}
</style>