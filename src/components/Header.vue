<script setup lang="ts">

interface HeaderProps {

}

const props = defineProps<HeaderProps>()

</script>

<template>
  <div :class="['header']">
    <slot></slot>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  padding: var(--gap-3);
  box-sizing: border-box;
}
</style>