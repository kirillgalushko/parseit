<script setup lang="ts">
import AddVaultModal from 'src/web/components/AddVaultModal.vue'
import ArticlesSidebar from 'src/web/components/ArticlesSidebar/ArticlesSidebar.vue'
import ArticleView from 'src/web/components/ArticleView.vue'
import FoldersSidebar from 'src/web/components/FoldersSidebar/FoldersSidebar.vue'
import { useArticleStore } from 'src/web/stores/articleStore'

const articleStore = useArticleStore()
</script>

<template>
  <AddVaultModal />
  <div class="app-layout">
    <FoldersSidebar />
    <ArticlesSidebar />
    <ArticleView :article="articleStore.selectedArticle" />
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: auto auto 1fr;
  height: 100%;
  grid-template-rows: 100vh;
}
</style>
