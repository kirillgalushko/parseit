<script setup lang="ts">
import { Button, Stack, Input, Text, Gap } from '@gui/components'
import { useAddArticle } from 'src/web/hooks/useAddArticle'

const { articleUrl, addArticle, isLoading } = useAddArticle()
</script>

<template>
  <form @submit.prevent="addArticle" :class="['placeholder']">
    <Text typography="title-3">Добавьте статью</Text>
    <Text typography="paragraph-1" color="secondary">Введите url статьи и нажмите Enter</Text>
    <Gap direction="vertical" :default="3" />
    <Stack direction="column" :gap="3">
      <Input v-model="articleUrl" placeholder="https://..." />
      <Button
        :isLoading="isLoading"
        :disabled="isLoading"
        mode="accent"
        type="submit"
        @click="addArticle"
        >Добавить статью</Button
      >
    </Stack>
  </form>
</template>

<style scoped>
.placeholder {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 20%;
  width: 80%;
  max-width: 350px;
  margin: 0 auto;
}
</style>
