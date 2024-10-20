<script setup lang="ts">

interface TabsProps { }

const props = defineProps<TabsProps>()
</script>

<template>
  <div :class="['tabs']">
    <slot></slot>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  border-radius: 8px;
  padding: 4px;
}
</style>