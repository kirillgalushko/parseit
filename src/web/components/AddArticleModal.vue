<script setup lang="ts">
import { Modal, Button, Input, Gap } from '@gui/components'
import { useAddArticle } from 'src/web/hooks/useAddArticle'

interface AddArticleModalProps {
  onClose: () => void
}

const { addArticle, articleUrl, isLoading } = useAddArticle()
const props = defineProps<AddArticleModalProps>()

const handleAddArticle = async () => {
  await addArticle()
  props.onClose()
}
</script>

<template>
  <Modal v-bind="$attrs" :onClose="props.onClose" showCloseButton title="Сохранить статью">
    <form id="add-article-modal" @submit.prevent="handleAddArticle">
      Введите url статьи и нажмите Enter
      <Gap :default="3" direction="vertical" />
      <Input v-model="articleUrl" />
    </form>
    <template #footer>
      <Button @click="props.onClose"> Закрыть </Button>
      <Button
        :isLoading="isLoading"
        :disabled="isLoading"
        mode="accent"
        type="submit"
        @click="handleAddArticle"
        form="add-article-modal"
      >
        Сохранить
      </Button>
    </template>
  </Modal>
</template>

<style scoped></style>
