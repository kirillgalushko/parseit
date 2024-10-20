<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Button from './components/Button.vue'
import Text from './components/Text.vue'
import Stack from './components/Stack.vue'
import Card from './components/Card.vue'
import Sidebar from './components/Sidebar.vue';
import Row from './components/Row.vue';
import Header from './components/Header.vue'
import parseWebpage from './api/parseWebpage';
import { Article } from './types/Article'
import ArticleView from './components/ArticleView.vue'
import Input from './components/Input.vue'

const urls = [
  'https://vuejs.org/guide/essentials/lifecycle.html',
  'https://vite.dev/guide/why.html',
  'https://react.dev/learn/thinking-in-react'
]

const onSelectArticle = (article: Article) => {
  selectedArticle.value = article
  console.log(article.content)
}

const articles = ref<Article[]>([])
const selectedArticle = ref<Article | null>(null)
const urlValue = ref<string>('')

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
            <Card interactive stretched :onClick="() => onSelectArticle(article)">
              <Text ellipsis typography="title-4-semibold">{{ article.title }}</Text>
              <Text ellipsis typography="subtitle-2-semibold">{{ article.excerpt }}</Text>
              <Text ellipsis :clamp="2" typography="paragraph-3-regular">{{ article.textContent }}</Text>
            </Card>
          </div>
        </Stack>
      </Sidebar>
      <ArticleView>
        <div v-if="selectedArticle">
          <Text typography="title-1-semibold">{{ selectedArticle.title }}</Text>
          <Text typography="subtitle-1-semibold">{{ selectedArticle.excerpt }}</Text>
          <div v-html="selectedArticle?.content"></div>
        </div>
      </ArticleView>
    </Row>
  </Stack>
</template>
