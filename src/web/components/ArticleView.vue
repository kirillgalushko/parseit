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
    <div class="scrollable">
      <div class="article-content">
        <PlaceholderView v-if="!props.article" />
        <div v-if="props.article">
          <!-- <h1>{{ props.article.title }}</h1>
          <h5>{{ props.article.excerpt }}</h5> -->
          <!-- <iframe v-if="articleView === 'html'" :srcdoc="props.article.originalHtml"></iframe> -->
          <div v-if="articleView === 'editor'">
            <Editor :article="props.article" />
          </div>
          <div v-if="articleView === 'reader'">
            <Viewer :article="props.article" />
          </div>
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
  position: relative;
}

.article-content {
  width: 100%;
  margin: 0 auto;
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
