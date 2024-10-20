<script setup lang="ts">

interface ArticleViewProps { }

const props = defineProps<ArticleViewProps>()

</script>

<template>
  <div :class="['article']">
    <div class="scrollable">
      <div class="article-content">
        <slot></slot>
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
</style>