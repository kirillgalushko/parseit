<script setup lang="ts">

interface InputProps {
}

const props = defineProps<InputProps>()
const model = defineModel()

</script>

<template>
  <input v-bind="$attrs" v-model="model"  class="input" />
</template>

<style scoped>
.input {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  background: transparent;
  width: 320px;
  border-radius: 6px;
}
</style>