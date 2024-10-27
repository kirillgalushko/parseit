<script setup lang="ts">
import ArticleView from './components/ArticleView.vue'
import { useArticleStore } from './stores/articleStore';
import FoldersSidebar from './components/FoldersSidebar/FoldersSidebar.vue'
import ArticlesSidebar from './components/ArticlesSidebar/ArticlesSidebar.vue'

const articleStore = useArticleStore();
</script>

<template>
  <div class="app-layout">
    <div class="grid">
      <FoldersSidebar />
      <ArticlesSidebar />
      <ArticleView :article="articleStore.selectedArticle" />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.grid {
  display: grid;
  grid-template-columns: auto auto 1fr;
  height: 100%;
}
</style>
