<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
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


const urls = [
  'https://vuejs.org/guide/essentials/lifecycle.html',
  'https://vite.dev/guide/why.html',
  'https://react.dev/learn/thinking-in-react'
]

const articles = ref<Article[]>([])
const selectedArticle = ref<Article>()
const urlValue = ref<string>('')

const onSelectArticle = (article: Article) => {
  selectedArticle.value = article
}

const getArticle = async (url: string) => {
  const page = await parseWebpage(url)
  if (page) {
    articles.value.push({ ...page, id: String(urls.indexOf(url)) })
  }
}

const handleAddArticle = () => {
  if (urlValue.value) {
    getArticle(urlValue.value)
    urlValue.value = ''
  }
}

watch(articles.value, () => {
  if (!selectedArticle.value && articles.value[0]) {
    selectedArticle.value = articles.value[0]
  }
})

const fetchArticles = async () => {
  for (const url of urls) {
    getArticle(url)
  }
}

onMounted(() => {
  fetchArticles()
})
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
          <div v-for="article of articles" :key="article.title">
            <ArticleCard :article="article" :onClick="() => onSelectArticle(article)" />
          </div>
        </Stack>
      </Sidebar>
      <ArticleView :article="selectedArticle" />
    </Row>
  </Stack>
</template>
