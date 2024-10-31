<script setup lang="ts">
import ArticleView from 'src/web/components/ArticleView.vue';
import { useArticleStore } from 'src/web/stores/articleStore';
import FoldersSidebar from 'src/web/components/FoldersSidebar/FoldersSidebar.vue';
import ArticlesSidebar from 'src/web/components/ArticlesSidebar/ArticlesSidebar.vue';
import AddVaultModal from 'src/web/components/AddVaultModal.vue';

const articleStore = useArticleStore();
</script>

<template>
  <AddVaultModal />
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
