<script setup lang="ts">

interface ToolbarProps {

}

const props = defineProps<ToolbarProps>()

</script>

<template>
  <div :class="['toolbar']">
    <slot></slot>
  </div>
</template>

<style scoped>
.toolbar {
  width: 100%;
  border-bottom: 1px solid hsl(var(--border));
  padding: var(--gap-3);
  box-sizing: border-box;
}
</style>