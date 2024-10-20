<script setup lang="ts">
import { Button } from 'gui'
import { onMounted, ref, watch } from 'vue'
import Text from './components/Text.vue'
import Stack from './components/Stack.vue'
import Card from './components/Card.vue'
import Sidebar from './components/Sidebar.vue';
import Row from './components/Row.vue';

import parseWebpage from './api/parseWebpage';
import { Article } from './types/Article'
import ArticleView from './components/ArticleView.vue'

const urls = [
  'https://vuejs.org/guide/essentials/lifecycle.html',
  'https://vuejs.org/guide/essentials/forms',
  'https://vuejs.org/guide/essentials/event-handling'
]

const onSelectArticle = (article: Article) => {
  selectedArticle.value = article
  console.log(article.content)
}

const articles = ref<Article[]>([])
const selectedArticle = ref<Article | null>(null)

watch(articles.value, () => {
  if (!selectedArticle.value && articles.value[0]) {
    selectedArticle.value = articles.value[0]
  }
})

const fetchArticles = async () => {
  for (const url of urls) {
    const page = await parseWebpage(url)
    if (page) {
      articles.value.push({ ...page, id: String(urls.indexOf(url)) })
    }
  }
}

onMounted(() => {
  fetchArticles()
})
</script>

<template>
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
      <div v-if="selectedArticle" v-html="selectedArticle?.content"></div>
    </ArticleView>
  </Row>
</template>
