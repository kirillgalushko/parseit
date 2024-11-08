<script setup lang="ts">
import { Button, Stack, Separator, Tooltip, Tabs, Tab, useSize, Confirm } from '@gui/components'
import EyeIcon from '@gui/icons/outline/eye.js'
import EditIcon from '@gui/icons/outline/pencil.js'
import { storeToRefs } from 'pinia'
import { useArticleActions } from 'src/web/hooks/useArticleActions'
import { useArticleStore } from 'src/web/stores/articleStore'
import { ViewVariant } from 'src/web/types/Article'
import { computed } from 'vue'

const articleStore = useArticleStore()
const { selectedArticle } = storeToRefs(articleStore)
const { actions: articleActions, confirmModalData } = useArticleActions(selectedArticle)

const onChangeViewVariant = (variant: string) => {
  articleStore.setArticleView(variant as ViewVariant)
}

const handleCloseArticle = () => {
  articleStore.setSelectedArticle(null)
}

const actions = computed(
  () =>
    [
      ...articleActions.value,
      { type: 'separator' },
      {
        type: 'button',
        name: 'Закрыть',
        icon: 'x',
        actionHandler: handleCloseArticle
      }
    ] as const
)

const { elementRef, width } = useSize()
const smallSizebar = computed(() => Boolean(width.value < 414))
</script>

<template>
  <Confirm v-bind="confirmModalData" />
  <div ref="elementRef" :class="['toolbar']">
    <Stack alignItems="center" direction="row" :gap="2">
      <Tabs :value="articleStore.articleView" :onChange="onChangeViewVariant">
        <Tooltip>
          <Tab name="reader">
            <template v-if="!smallSizebar">Режим чтения</template>
            <EyeIcon v-if="smallSizebar" class="tab-icon" />
          </Tab>
          <template #popper> Режим чтения </template>
        </Tooltip>
        <Tooltip>
          <Tab name="editor">
            <template v-if="!smallSizebar">Редактор</template>
            <EditIcon v-if="smallSizebar" class="tab-icon" />
          </Tab>
          <template #popper> Редактор </template>
        </Tooltip>
      </Tabs>
    </Stack>
    <Stack alignItems="center" direction="row">
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
  background-color: hsl(var(--background));
}

.tab-icon {
  font-size: 16px;
}
</style>
