<template>
  <div :class="['loader']"></div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: hsl(var(--background));
}
</style>
