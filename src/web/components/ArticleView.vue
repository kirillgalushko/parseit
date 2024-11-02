<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Editor from 'src/web/components/Editor/Editor.vue'
import Viewer from 'src/web/components/Editor/Viewer.vue'
import PlaceholderView from 'src/web/components/PlaceholderView.vue'
import Toolbar from 'src/web/components/Toolbar.vue'
import { useArticleStore } from 'src/web/stores/articleStore'
import { Article } from 'src/web/types/Article'

interface ArticleViewProps {
  article?: Article | null
}

const props = defineProps<ArticleViewProps>()
const { articleView } = storeToRefs(useArticleStore())
</script>

<template>
  <div :class="['article']">
    <Toolbar v-if="props.article" />
    <div class="article-content">
      <PlaceholderView v-if="!props.article" />
      <Editor v-if="props.article && articleView === 'editor'" :article="props.article" />
      <Viewer v-if="props.article && articleView === 'reader'" :article="props.article" />
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

.article-content {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.article-content:deep(img) {
  max-width: 100%;
  height: auto;
}
</style>
