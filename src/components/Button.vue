<script setup lang="ts">
import { defineProps } from 'vue';

export interface ButtonProps {
    mode: 'default' | 'accent',
}

const props = defineProps<ButtonProps>()

</script>

<template>
    <button v-bind="$attrs" :class="['button', props.mode]">
        <slot></slot>
    </button>
</template>

<style scoped>
.button {
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    background-color: var(--color-bg-secondary);
    color: var(--color-text);
    border: none;
    border-radius: 6px;
    font-weight: 500;
}

.button.accent {
  background-color: var(--color-bg-opposite);
  color: var(--color-text-opposite);
}
</style>