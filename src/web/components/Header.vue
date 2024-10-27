<template>
  <div :class="['header']">
    <slot></slot>
  </div>
</template>

<style scoped>
.header {
  border-bottom: 1px solid hsl(var(--border));
  padding: 0 var(--gap-4);
  padding-bottom: var(--gap-3);
  margin: 0 calc(0px - var(--gap-4));
  height: 40px;
  display: flex;
  align-items: center;
}
</style>