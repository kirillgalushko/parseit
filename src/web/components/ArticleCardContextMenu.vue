<script setup lang="ts">
import { ContextMenu, ContextMenuList, ContextMenuItem, Icon } from 'gui'
import { useArticleActions } from 'src/web/hooks/useArticleActions'

export interface ArticleCardContextMenuProps {
  article: Ref<Article>
}

const props = defineProps<ArticleCardContextMenuProps>()

const { actions } = useArticleActions(props.article)
</script>

<template>
  <ContextMenu v-bind="$attrs">
    <ContextMenuList>
      <ContextMenuItem v-for="action of actions" @click="action.actionHandler">
        <Icon :name="action.icon" v-if="action.icon" />
        {{ action.name }}
      </ContextMenuItem>
    </ContextMenuList>
  </ContextMenu>
</template>

<style scoped></style>
