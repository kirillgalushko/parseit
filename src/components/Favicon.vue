<script setup lang="ts">

interface FaviconProps {
  src: string
}

const props = defineProps<FaviconProps>()
</script>

<template>
  <img :src="props.src" class="favicon" />
</template>

<style scoped>
.favicon {
  width: 16px;
  height: 16px;
}
</style>