<script setup lang="ts">
import { Article } from 'src/web/types/Article';
import { Text, Stack, Card, Gap } from 'gui'
import Favicon from 'src/web/components/Favicon.vue';
import { useArticleStore } from 'src/web/stores/articleStore';
import { storeToRefs } from 'pinia';
import { useSearchStore } from 'src/web/stores/searchStore';
import { computed } from 'vue';
import { trimAroundSubstring } from 'src/web/utils/trimAroundSubstring';
import HighlightText from 'src/web/components/HighlightText.vue';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const props = defineProps<ArticleCardProps>()
const articleStore = useArticleStore();
const { searchQuery } = storeToRefs(useSearchStore());
const searchResultText = computed(() => {
  return trimAroundSubstring(props.article.body, searchQuery.value, 2, 15)
})
</script>

<template>
  <Card :background="articleStore.selectedArticle?.id === props.article.id ? 'secondary' : 'default'" interactive
    stretched :onClick="props.onClick">
    <Text ellipsis typography="title-4-semibold">{{ article.name }}</Text>
    <!-- <Text ellipsis typography="subtitle-2-semibold">{{ article.excerpt }}</Text> -->
    <Gap direction="vertical" :default="1" />
    <Text ellipsis :clamp="2" typography="paragraph-3-regular">
      <HighlightText :text="searchResultText || article.body" :searchQuery="searchQuery" />
    </Text>
    <Gap direction="vertical" :default="2" />
    <Stack direction="row" :gap="2" stretched>
      <Favicon v-if="article.faviconUrl" :src="article.faviconUrl" />
      <Text ellipsis typography="paragraph-3-regular" mode="secondary">{{ article.domain }}</Text>
    </Stack>
  </Card>
</template>
