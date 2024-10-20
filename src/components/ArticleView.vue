<script setup lang="ts">
import Toolbar from './Toolbar.vue';
import Button from './Button.vue';
import Stack from './Stack.vue';
import Text from './Text.vue'
import { Article } from '../types/Article';
import { ViewVariant } from '../types/View';
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
import { ref } from 'vue';

interface ArticleViewProps {
  article?: Article | null
}

const props = defineProps<ArticleViewProps>()
const viewVariant = ref<ViewVariant>('reader')

const onChangeViewVariant = (variant: ViewVariant) => {
  viewVariant.value = variant
}

const handleOpenPage = () => {
  window.open(props.article?.originalUrl, '_blank');
}
</script>

<template>
  <div :class="['article']">
    <Toolbar>
      <Stack direction="row" :gap="2">
        <Tabs>
          <Tab :onClick="() => onChangeViewVariant('reader')" :selected="viewVariant === 'reader'">Режим чтения</Tab>
          <Tab :onClick="() => onChangeViewVariant('html')" :selected="viewVariant === 'html'">HTML</Tab>
        </Tabs>
        <Button mode="default" @click="handleOpenPage">Открыть страницу</Button>
      </Stack>
    </Toolbar>
    <div class="scrollable">
      <div class="article-content">
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
}

.scrollable {
  height: 100%;
  overflow: auto;
  padding-top: 40px;
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