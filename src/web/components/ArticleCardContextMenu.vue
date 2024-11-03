<script setup lang="ts">
import { ContextMenu, ContextMenuList, ContextMenuItem, Icon, useContextMenu } from 'gui'
import { useArticleActions } from 'src/web/hooks/useArticleActions'
import { Article } from 'src/web/types/Article'
import { Ref } from 'vue'

export interface ArticleCardContextMenuProps {
  article: Ref<Article>
  data: ReturnType<typeof useContextMenu>['contextMenuData']
}

const props = defineProps<ArticleCardContextMenuProps>()

const { actions } = useArticleActions(props.article)
</script>

<template>
  <ContextMenu v-bind="$attrs" :data="props.data">
    <ContextMenuList>
      <ContextMenuItem v-for="action of actions" @click="action.actionHandler">
        <Icon :name="action.icon" v-if="action.icon" />
        {{ action.name }}
      </ContextMenuItem>
    </ContextMenuList>
  </ContextMenu>
</template>

<style scoped></style>
