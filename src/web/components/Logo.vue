<script setup lang="ts">
import logoCompact from 'src/web/assets/logo-white-clip.svg?raw'
import logoLong from 'src/web/assets/logo-white-long.svg?raw'
import { inject, Ref } from 'vue'

const isCompact = inject<Ref<boolean>>('sidebar-is-compact')
</script>

<template>
  <div :class="['logo', { compact: isCompact }]" v-html="isCompact ? logoCompact : logoLong"></div>
</template>

<style scoped>
.logo {
  display: inline-flex;
  color: hsl(var(--foreground));
}

.logo.compact {
  justify-content: center;
  width: 100%;
}
</style>
