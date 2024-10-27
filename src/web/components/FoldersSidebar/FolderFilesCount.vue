<script setup lang="ts">
import { inject, Ref } from 'vue';
import { Badge } from 'gui';

const sidebarWidth = inject<Ref<number>>('sidebar-width');
</script>

<template>
  <Badge v-if="(sidebarWidth || 0) > 180" mode="ghost">
    <slot></slot>
  </Badge>
</template>

<style scoped></style>