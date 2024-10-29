<script setup lang="ts">
import { Button, Stack, Sidebar, Gap, Icon } from 'gui'
import Header from '../Header.vue'
import { Article } from '../../types/Article';
import ArticleCard from '../ArticleCard.vue'
import { useArticleStore } from '../../stores/articleStore';
import { useFoldersStore } from '../../stores/foldersStore';
import SearchInput from '../Search/SearchInput.vue';
import AddArticleModal from '../AddArticleModal.vue';
import { computed, ref } from 'vue';
import { useSearchStore } from '../../stores/searchStore';
import { storeToRefs } from 'pinia';
import Sorting from '../Sorting.vue';
import { sortArticles } from '../../utils/sortArticles';

const foldersStore = useFoldersStore();
const articleStore = useArticleStore();
const { searchQuery, filteredArticles, sorting } = storeToRefs(useSearchStore());
const isAddModalOpened = ref<boolean>(false);

const onSelectArticle = (article: Article) => {
  articleStore.setSelectedArticle(article)
}

const handleAddArticle = () => {
  isAddModalOpened.value = true;
}

const handleCloseModal = () => {
  isAddModalOpened.value = false;
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
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
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
