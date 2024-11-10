<script setup lang="ts">
import { Stack, Sidebar, Gap, Tooltip } from '@gui/components'
import { storeToRefs } from 'pinia'
import ArticleCard from 'src/web/components/ArticleCard/ArticleCard.vue'
import AddArticleButton from 'src/web/components/ArticlesSidebar/AddArticleButton.vue'
import Header from 'src/web/components/Header.vue'
import SearchInput from 'src/web/components/SearchInput.vue'
import Sorting from 'src/web/components/Sorting.vue'
import { useArticleStore } from 'src/web/stores/articleStore'
import { useFoldersStore } from 'src/web/stores/foldersStore'
import { useSearchStore } from 'src/web/stores/searchStore'
import { Article } from 'src/web/types/Article'
import { sortArticles } from 'src/web/utils/sortArticles'
import { computed } from 'vue'

const foldersStore = useFoldersStore()
const articleStore = useArticleStore()
const { searchQuery, filteredArticles, sorting } = storeToRefs(useSearchStore())

const onSelectArticle = (article: Article) => {
  articleStore.setSelectedArticle(article)
}

const articles = computed(() => {
  if (searchQuery.value) {
    return sortArticles(filteredArticles.value, sorting.value)
  }
  return sortArticles(articleStore.articles, sorting.value)
})
</script>

<template>
  <Sidebar :width="300" max-width="40vw" :padding="8">
    <div ref="elementRef" class="sidebar-content">
      <Header>
        <div class="header-content">
          <Tooltip class="ellipsis">
            <span>
              {{ foldersStore.selectedFolder?.name }}
            </span>
            <template #popper>
              {{ foldersStore.selectedFolder?.name }}
            </template>
          </Tooltip>
          <AddArticleButton />
        </div>
      </Header>
      <Gap direction="vertical" :default="4" />
      <Stack direction="row" :gap="2" stretched>
        <SearchInput />
        <Sorting />
      </Stack>
      <Gap direction="vertical" :default="4" />
      <div class="articles-list">
        <Stack stretched :gap="2" direction="column">
          <div v-for="article of articles" :key="article.name">
            <ArticleCard :article="article" :onClick="() => onSelectArticle(article)" />
          </div>
        </Stack>
      </div>
    </div>
  </Sidebar>
</template>

<style scoped>
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.articles-list {
  --sidebar-padding: 8px;
  --half-sidebar-padding: calc(var(--sidebar-padding) / 2);
  overflow-y: auto;
  flex: 1;
  margin-left: calc(0px - var(--sidebar-padding));
  padding-left: var(--sidebar-padding);
  padding-right: var(--half-sidebar-padding);
  margin-right: calc(0px - var(--half-sidebar-padding));
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 4px;
}
.ellipsis {
  cursor: default;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
