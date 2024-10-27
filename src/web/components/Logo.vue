<script setup lang="ts">
import { computed, inject, Ref } from 'vue';
import logoLong from '../assets/logo-white-long.svg'
import logoCompact from '../assets/logo-white-clip.svg'

const sidebarWidth = inject<Ref<number>>('sidebar-width')
const isCompact = computed(() => (sidebarWidth?.value || 0) < 150)
</script>

<template>
  <div :class="['logo', { compact: isCompact }]">
    <img :src="isCompact ? logoCompact : logoLong" alt="Logo">
  </div>
</template>

<style scoped>
.logo {
  display: inline-flex;
}

.logo.compact {
  justify-content: center;
  width: 100%;
}
</style>