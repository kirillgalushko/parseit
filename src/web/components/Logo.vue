<script setup lang="ts">
import { inject, Ref } from 'vue';
import logoLong from 'src/web/assets/logo-white-long.svg'
import logoCompact from 'src/web/assets/logo-white-clip.svg'

const isCompact = inject<Ref<boolean>>('sidebar-is-compact')
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