<script setup lang="ts">

interface RowProps {
  fullHeight?: boolean;
}

const props = defineProps<RowProps>()

</script>

<template>
  <div :class="['row', { 'fullHeight': props.fullHeight }]">
    <slot></slot>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.fullHeight {
  height: 100%;
}
</style>