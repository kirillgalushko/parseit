<script setup lang="ts">

interface TabProps {
  selected?: boolean;
  onClick: () => void;
}

const props = defineProps<TabProps>()
</script>

<template>
  <div @click="props.onClick" :class="['tab', { selected: props.selected }]">
    <slot></slot>
  </div>
</template>

<style scoped>
.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: button;
  border-radius: 6px;
  background-color: transparent;
  padding: 4px 12px;
  font-weight: 500;
  cursor: pointer;
}

.selected {
  background-color: var(--color-bg);
  color: var(--color-text);
}
</style>