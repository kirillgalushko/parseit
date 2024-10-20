<script setup lang="ts">
import { ref } from 'vue'

const width = ref<number>(400);
const isResizing = ref<boolean>(false);

const startResizing = () => {
  isResizing.value = true;
  document.addEventListener('mousemove', resizeSidebar);
  document.addEventListener('mouseup', stopResizing);
}

const resizeSidebar = (event: MouseEvent) => {
  if (isResizing.value && event.clientX > 0) {
    width.value = event.clientX;
  }
}

const stopResizing = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', resizeSidebar);
  document.removeEventListener('mouseup', resizeSidebar);
}

</script>

<template>
  <div :class="['sidebar']" :style="{ width: `${width}px` }">
    <div class="resize-handle" @mousedown="startResizing"></div>
    <slot></slot>
  </div>
</template>

<style scoped>
.sidebar {
  width: 400px;
  border-right: 1px solid var(--color-border);
  height: 100%;
  padding: var(--gap-3);
  box-sizing: border-box;
  position: relative;
  min-width: 200px;
}

.resize-handle {
  width: 8px;
  cursor: ew-resize;
  position: absolute;
  top: 0;
  right: -4px;
  height: 100%;
}
</style>