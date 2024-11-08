<script setup lang="ts">
import { Input } from '@gui/components'
import { useSearchStore } from 'src/web/stores/searchStore'
import { computed } from 'vue'

const searchStore = useSearchStore()

const searchQuery = computed({
  get: () => searchStore.searchQuery,
  set: (value: string) => {
    searchStore.setQuery(value)
  }
})
</script>

<template>
  <Input v-model="searchQuery" placeholder="Поиск по статьям" />
</template>
