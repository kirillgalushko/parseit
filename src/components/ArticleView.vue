<script setup lang="ts">
import Toolbar from './Toolbar.vue';
import { Button, Stack, Text, Tabs, Tab, Icon } from 'gui';
import { Article } from '../types/Article';
import PlaceholderView from './PlaceholderView.vue';
import { ref } from 'vue';
import { useArticleStore } from '../store';

export type ViewVariant = 'html' | 'reader'

interface ArticleViewProps {
  article?: Article | null
}

const props = defineProps<ArticleViewProps>()
const viewVariant = ref<ViewVariant>('reader')
const articleStore = useArticleStore();

const onChangeViewVariant = (variant: ViewVariant) => {
  viewVariant.value = variant
}

const handleOpenPage = () => {
  window.open(props.article?.originalUrl, '_blank');
}

const handleRemoveArticle = () => {
  if (props.article) {
    articleStore.removeArticle(props.article)
  }
}

const handleCloseArticle = () => {
  if (props.article) {
    articleStore.setSelectedArticle(null)
  }
}
</script>

<template>
  <div :class="['article']">
    <Toolbar v-if="props.article">
      <Stack direction="row" :gap="2">
        <Tabs>
          <Tab :onClick="() => onChangeViewVariant('reader')" :selected="viewVariant === 'reader'">Режим чтения</Tab>
          <Tab :onClick="() => onChangeViewVariant('html')" :selected="viewVariant === 'html'">HTML</Tab>
        </Tabs>
        <Button @click="handleOpenPage" mode="default">
          <Icon name="external-link" />Открыть страницу
        </Button>
        <Button @click="handleRemoveArticle" mode="default">
          <Icon name="delete" /> Удалить
        </Button>
        <Button @click="handleCloseArticle" mode="default">
          <Icon name="close" /> Закрыть
        </Button>
      </Stack>
    </Toolbar>
    <div class="scrollable">
      <div class="article-content">
        <PlaceholderView v-if="!props.article" />
        <div v-if="props.article">
          <Text typography="title-1-semibold">{{ props.article.title }}</Text>
          <Text typography="subtitle-1-semibold">{{ props.article.excerpt }}</Text>
          <iframe v-if="viewVariant === 'html'" :srcdoc="props.article.originalHtml"></iframe>
          <div v-if="viewVariant === 'reader'" v-html="props.article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.scrollable {
  height: 100%;
  overflow: auto;
  padding-top: 40px;
  padding-bottom: 40px;
  position: relative;
}

.article-content {
  width: 80%;
  max-width: 800px;
  margin: 0 auto
}

.article-content:deep(img) {
  max-width: 100%;
  height: auto;
}

.article-content:deep(iframe) {
  width: 100%;
  height: 100%;
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>