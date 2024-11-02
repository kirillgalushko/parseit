<script setup lang="ts">
import { Button, Stack, Input, Text, Gap } from 'gui'
import { useAddArticle } from 'src/web/hooks/useAddArticle'

const { articleUrl, addArticle, isLoading } = useAddArticle()
</script>

<template>
  <div :class="['placeholder']">
    <Text typography="title-1-semibold">Добавьте статью</Text>
    <Text typography="paragraph-2-regular" mode="secondary"
      >Введите url статьи и нажмите Enter</Text
    >
    <Gap direction="vertical" :default="4" />
    <Stack direction="column" :gap="3">
      <Input v-model="articleUrl" placeholder="https://..." />
      <Button :isLoading="isLoading" :disabled="isLoading" mode="accent" @click="addArticle"
        >Добавить статью</Button
      >
    </Stack>
  </div>
</template>

<style scoped>
.placeholder {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 30%;
}
</style>
