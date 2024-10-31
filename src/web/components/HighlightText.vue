<script setup lang="ts">
import { ref, watch } from 'vue'

interface HighlightTextProps {
  text: string
  searchQuery?: string | null
}

const props = defineProps<HighlightTextProps>()
const highlightedContent = ref('')

function highlightMatches(text: string, substring?: string | null) {
  if (!substring) return text
  const regex = new RegExp(`(${substring})`, 'gi')
  return text.replace(regex, `<span class="global-search-highlight">$1</span>`)
}

watch(
  () => props.searchQuery,
  (newQuery) => {
    highlightedContent.value = highlightMatches(props.text, newQuery)
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <div v-html="highlightedContent"></div>
  </div>
</template>

<style>
.global-search-highlight {
  background-color: rgb(106, 70, 59);
  color: hsl(var(--foreground));
}
</style>
