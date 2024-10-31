<script setup lang="ts">
import { Button, Stack, Sidebar, Gap, Icon } from 'gui'
import { storeToRefs } from 'pinia'
import AddArticleModal from 'src/web/components/AddArticleModal.vue'
import ArticleCard from 'src/web/components/ArticleCard.vue'
import Header from 'src/web/components/Header.vue'
import SearchInput from 'src/web/components/Search/SearchInput.vue'
import Sorting from 'src/web/components/Sorting.vue'
import { useArticleStore } from 'src/web/stores/articleStore'
import { useFoldersStore } from 'src/web/stores/foldersStore'
import { useSearchStore } from 'src/web/stores/searchStore'
import { Article } from 'src/web/types/Article'
import { sortArticles } from 'src/web/utils/sortArticles'
import { computed, ref } from 'vue'

const foldersStore = useFoldersStore()
const articleStore = useArticleStore()
const { searchQuery, filteredArticles, sorting } = storeToRefs(useSearchStore())
const isAddModalOpened = ref<boolean>(false)

const onSelectArticle = (article: Article) => {
  articleStore.setSelectedArticle(article)
}

const handleAddArticle = () => {
  isAddModalOpened.value = true
}

const handleCloseModal = () => {
  isAddModalOpened.value = false
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
    <AddArticleModal :isOpened="isAddModalOpened" :onClose="handleCloseModal" />
    <Header>
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%">
        {{ foldersStore.selectedFolder?.name }}
        <Button mode="accent" @click="handleAddArticle">
          <Icon name="circle-plus" /> Добавить
        </Button>
      </div>
    </Header>
    <Gap direction="vertical" :default="4" />
    <Stack direction="row" :gap="2" stretched>
      <SearchInput />
      <Sorting />
    </Stack>
    <Gap direction="vertical" :default="4" />
    <Stack stretched :gap="2" direction="column">
      <div v-for="article of articles" :key="article.name">
        <ArticleCard :article="article" :onClick="() => onSelectArticle(article)" />
      </div>
    </Stack>
  </Sidebar>
</template>
