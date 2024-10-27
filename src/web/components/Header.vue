<template>
  <div :class="['header']">
    <slot></slot>
  </div>
</template>

<style scoped>
.header {
  border-bottom: 1px solid hsl(var(--border));
  padding: var(--gap-2) var(--gap-4);
  margin: 0 calc(0px - var(--gap-2));
  margin-top: -8px;
  height: 60px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
</style>