<script setup lang="ts">

import { Button, Stack, Sidebar, Input, Gap, Icon, Card, Text } from 'gui'
import Header from './components/Header.vue'
import { Article } from './types/Article'
import ArticleView from './components/ArticleView.vue'
import ArticleCard from './components/ArticleCard.vue'
import { useDemoArticles } from './hooks/useDemoArticles';
import { useArticleStore } from './stores/articleStore';
import { useAddArticle } from './hooks/useAddArticle';
import logoSrc from './assets/logo-white-rectangle-clip.svg'

const articleStore = useArticleStore();
const { addArticle } = useAddArticle();
// useDemoArticles();

const onSelectArticle = (article: Article) => {
  articleStore.setSelectedArticle(article)
}

</script>

<template>
  <div class="app-layout">
    <div class="grid">
      <Sidebar minWidth="100px" maxWidth="300px">
        <Header>
          <img :src="logoSrc" />
        </Header>
        <Gap direction="vertical" :default="4" />
        <Stack :gap="2" direction="column" stretched>
          <Card interactive stretched>
            <Stack :gap="2" direction="row" alignItems="center" stretched>
              <Icon :style="'font-size: 16px'" name="inbox" /><Text typography="paragraph-2-regular"
                ellipsis>Сохраненные</Text>
              <strong>{{ articleStore.articles.length }}</strong>
            </Stack>
          </Card>
          <Card interactive stretched>
            <Stack :gap="2" direction="row" alignItems="center" stretched>
              <Icon :style="'font-size: 16px'" name="archive " /><Text typography="paragraph-2-regular"
                ellipsis>Архив</Text>
            </Stack>
          </Card>
        </Stack>
      </Sidebar>
      <Sidebar>
        <Header>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            Сохраненные
            <Button mode="accent" @click="addArticle">
              <Icon name="circle-plus" /> Добавить
            </Button>
          </div>
        </Header>
        <Gap direction="vertical" :default="4" />
        <Stack direction="row" :gap="2" stretched>
          <Input placeholder="Поиск по статьям" />
          <Button squared mode="default">
            <Icon name="sort-descending" />
          </Button>
        </Stack>
        <Gap direction="vertical" :default="4" />
        <Stack stretched :gap="2" direction="column">
          <div v-for="article of articleStore.articles" :key="article.title">
            <ArticleCard :article="article" :onClick="() => onSelectArticle(article)" />
          </div>
        </Stack>
      </Sidebar>
      <ArticleView :article="articleStore.selectedArticle" />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.grid {
  display: grid;
  grid-template-columns: auto auto 1fr;
  height: 100%;
}
</style>
