<script setup lang="ts">
import { Button } from '@gui/components'
import { IconCirclePlusOutline } from '@gui/icons'
import AddArticleModal from 'src/web/components/AddArticleModal.vue'
import { computed, inject, ref } from 'vue'

const isAddModalOpened = ref<boolean>(false)
const sidebarWidth = inject('sidebar-width', ref(0))

const handleAddArticle = () => {
  isAddModalOpened.value = true
}

const handleCloseModal = () => {
  isAddModalOpened.value = false
}

const isSmallSize = computed(() => sidebarWidth?.value < 220)
</script>

<template>
  <AddArticleModal :isOpened="isAddModalOpened" :onClose="handleCloseModal" />
  <Button :squared="isSmallSize" mode="accent" @click="handleAddArticle">
    <IconCirclePlusOutline />
    <template v-if="!isSmallSize">Добавить </template>
  </Button>
</template>

<style scoped></style>
