<script setup lang="ts">
import { Article } from '../types/Article';
import { Text, Stack, Card, Gap } from 'gui'
import Favicon from '../components/Favicon.vue'
import { useArticleStore } from '../stores/articleStore';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const props = defineProps<ArticleCardProps>()
const articleStore = useArticleStore();
</script>

<template>
  <Card :background="articleStore.selectedArticle?.id === props.article.id ? 'secondary' : 'default'" interactive
    stretched :onClick="props.onClick">
    <Text ellipsis typography="title-4-semibold">{{ article.title }}</Text>
    <Text ellipsis typography="subtitle-2-semibold">{{ article.excerpt }}</Text>
    <Gap direction="vertical" :default="1" />
    <Text ellipsis :clamp="2" typography="paragraph-3-regular">{{ article.textContent }}</Text>
    <Gap direction="vertical" :default="2" />
    <Stack direction="row" :gap="2">
      <Favicon v-if="article.faviconUrl" :src="article.faviconUrl" />
      <Text ellipsis typography="paragraph-3-regular" mode="secondary">{{ article.domain }}</Text>
    </Stack>
  </Card>
</template>
