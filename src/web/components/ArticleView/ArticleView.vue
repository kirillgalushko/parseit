<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Editor from 'src/web/components/ArticleView/Editor.vue'
import PlaceholderView from 'src/web/components/ArticleView/PlaceholderView.vue'
import Toolbar from 'src/web/components/ArticleView/Toolbar.vue'
import Viewer from 'src/web/components/ArticleView/Viewer.vue'
import { useArticleStore } from 'src/web/stores/articleStore'

const { articleView, selectedArticle } = storeToRefs(useArticleStore())
</script>

<template>
  <div :class="['article']">
    <Toolbar v-if="selectedArticle" />
    <div class="article-content">
      <PlaceholderView v-if="!selectedArticle" />
      <Editor v-if="selectedArticle && articleView === 'editor'" :article="selectedArticle" />
      <Viewer v-if="selectedArticle && articleView === 'reader'" :article="selectedArticle" />
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
