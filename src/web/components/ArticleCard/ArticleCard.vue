<script setup lang="ts">
import { Text, Stack, Card, Gap, useContextMenu } from '@gui/components'
import { storeToRefs } from 'pinia'
import ArticleCardContextMenu from 'src/web/components/ArticleCard/ArticleCardContextMenu.vue'
import Favicon from 'src/web/components/Favicon.vue'
import HighlightText from 'src/web/components/HighlightText.vue'
import { useArticleStore } from 'src/web/stores/articleStore'
import { useSearchStore } from 'src/web/stores/searchStore'
import { Article } from 'src/web/types/Article'
import { trimAroundSubstring } from 'src/web/utils/trimAroundSubstring'
import { computed, ref } from 'vue'

interface ArticleCardProps {
  article: Article
  onClick: () => void
}

const props = defineProps<ArticleCardProps>()
const articleStore = useArticleStore()
const { searchQuery } = storeToRefs(useSearchStore())
const searchResultText = computed(() => {
  return trimAroundSubstring(props.article.body, searchQuery.value, 2, 15)
})
const { contextMenuData, targetRef } = useContextMenu()
</script>

<template>
  <div ref="targetRef">
    <Card
      :background="articleStore.selectedArticle?.id === props.article.id ? 'secondary' : 'default'"
      interactive
      stretched
      :onClick="props.onClick"
    >
      <Text ellipsis typography="title-4-semibold">{{ article.name }}</Text>
      <Gap direction="vertical" :default="1" />
      <Text ellipsis :clamp="2" typography="paragraph-3-regular">
        <HighlightText :text="searchResultText || article.excerpt" :searchQuery="searchQuery" />
      </Text>
      <Gap direction="vertical" :default="2" />
      <Stack direction="row" :gap="2" stretched>
        <Favicon v-if="article.faviconUrl" :src="article.faviconUrl" />
        <Text ellipsis typography="paragraph-3-regular" mode="secondary">{{
          article.siteName || article.domain
        }}</Text>
      </Stack>
    </Card>
  </div>
  <ArticleCardContextMenu :data="contextMenuData" :article="ref(article)" />
</template>
