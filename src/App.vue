<script setup lang="ts">
import Button from './components/Button.vue'
import Stack from './components/Stack.vue'
import Sidebar from './components/Sidebar.vue';
import Row from './components/Row.vue';
import Header from './components/Header.vue'
import { Article } from './types/Article'
import ArticleView from './components/ArticleView.vue'
import Input from './components/Input.vue'
import ArticleCard from './components/ArticleCard.vue'
import { useDemoArticles } from './hooks/useDemoArticles';
import { useArticleStore } from './store';
import { useAddArticle } from './hooks/useAddArticle';

const articleStore = useArticleStore();
const { articleUrl, addArticle } = useAddArticle();
useDemoArticles();

const onSelectArticle = (article: Article) => {
  articleStore.setSelectedArticle(article)
}
</script>

<template>
  <Stack fullHeight direction="column">
    <Header>
      <Stack direction="row" :gap="2">
        <Input v-model="articleUrl" placeholder="https://..." />
        <Button mode="accent" @click="addArticle">Добавить статью</Button>
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
