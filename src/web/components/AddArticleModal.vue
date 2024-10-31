<script setup lang="ts">
import { Modal, Button, Input, Gap } from 'gui'
import { useAddArticle } from 'src/web/hooks/useAddArticle';

interface AddArticleModalProps {
  onClose: () => void
}

const { addArticle, articleUrl } = useAddArticle();
const props = defineProps<AddArticleModalProps>()

const handleAddArticle = () => {
  addArticle();
  props.onClose();
}
</script>

<template>
  <Modal v-bind="$attrs" :onClose="props.onClose" showCloseButton title="Сохранить статью">
    Введите url статьи и нажмите Enter
    <Gap :default="3" direction="vertical" />
    <Input v-model="articleUrl" />
    <template #footer>
      <Button @click="props.onClose">
        Закрыть
      </Button>
      <Button mode="accent" @click="handleAddArticle">
        Сохранить
      </Button>
    </template>
  </Modal>
</template>

<style scoped></style>