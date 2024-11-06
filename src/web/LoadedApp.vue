<script setup lang="ts">
import AddVaultModal from 'src/web/components/AddVaultModal.vue'
import ArticlesSidebar from 'src/web/components/ArticlesSidebar.vue'
import ArticleView from 'src/web/components/ArticleView/ArticleView.vue'
import FoldersSidebar from 'src/web/components/FoldersSidebar/FoldersSidebar.vue'
</script>

<template>
  <AddVaultModal />
  <div class="app-layout">
    <FoldersSidebar />
    <ArticlesSidebar />
    <ArticleView />
  </div>
</template>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: auto auto minmax(200px, 1fr);
  height: 100%;
  grid-template-rows: 100vh;
}
</style>
