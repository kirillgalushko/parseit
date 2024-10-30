<script setup lang="ts">

import { useSettingsStore } from './stores/settingsStore'
import { useAppInit } from './hooks/useAppInit'
import { useFilesWatcher } from './hooks/useFilesWatcher'
import LoadedApp from './LoadedApp.vue'

const { isInitialized } = useAppInit();
const appSettings = useSettingsStore();
useFilesWatcher();
</script>

<template>
  <div v-if="!isInitialized">
    Loading...
  </div>
  <LoadedApp v-if="isInitialized" />
</template>
