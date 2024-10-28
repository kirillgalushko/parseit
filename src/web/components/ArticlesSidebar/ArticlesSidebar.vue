<script setup lang="ts">
import { Button, Stack, Sidebar, Input, Gap, Icon } from 'gui'
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

const foldersStore = useFoldersStore();
const articleStore = useArticleStore();
const { searchQuery, filteredArticles } = storeToRefs(useSearchStore());
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
    return filteredArticles.value
  }
  return articleStore.articles
})
</script>

<template>
  <Sidebar :width="300" :padding="8">
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
      <Button squared mode="default">
        <Icon name="sort-descending" />
      </Button>
    </Stack>
    <Gap direction="vertical" :default="4" />
    <Stack stretched :gap="2" direction="column">
      <div v-for="article of articles" :key="article.name">
        <ArticleCard :article="article" :onClick="() => onSelectArticle(article)" />
      </div>
    </Stack>
  </Sidebar>
</template>
