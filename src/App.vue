<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button.vue'
import Stack from './components/Stack.vue'
import Sidebar from './components/Sidebar.vue';
import Row from './components/Row.vue';
import Header from './components/Header.vue'
import parseWebpage from './api/parseWebpage';
import { Article } from './types/Article'
import ArticleView from './components/ArticleView.vue'
import Input from './components/Input.vue'
import ArticleCard from './components/ArticleCard.vue'
import { useDemoArticles } from './hooks/useDemoArticles';
import { useArticleStore } from './store';
import { v4 as uuidv4 } from 'uuid';

const urlValue = ref<string>('')
const articleStore = useArticleStore();
useDemoArticles();

const onSelectArticle = (article: Article) => {
  articleStore.setSelectedArticle(article)
}

const getArticle = async (url: string) => {
  const page = await parseWebpage(url)
  if (page) {
    articleStore.addArticle({ ...page, id: uuidv4(), originalUrl: url })
  }
}

const handleAddArticle = () => {
  if (urlValue.value) {
    getArticle(urlValue.value)
    urlValue.value = ''
  }
}

</script>

<template>
  <Stack fullHeight direction="column">
    <Header>
      <Stack direction="row" :gap="2">
        <Input v-model="urlValue" placeholder="https://..." />
        <Button mode="accent" @click="handleAddArticle">Добавить статью</Button>
      </Stack>
    </Header>
    <Row fullHeight>
      <Sidebar>
        <Stack :gap="2" direction="column">
          <div v-for="article of articleStore.articles" :key="article.title">
            <ArticleCard :article="article" :onClick="() => onSelectArticle(article)" />
          </div>
        </Stack>
      </Sidebar>
      <ArticleView :article="articleStore.selectedArticle" />
    </Row>
  </Stack>
</template>
