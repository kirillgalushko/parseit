<script setup lang="ts">

import { useSettingsStore } from './stores/settingsStore'
import { useAppInit } from './hooks/useAppInit'
import { useFilesWatcher } from './hooks/useFilesWatcher'
import LoadedApp from './LoadedApp.vue'
import AppLoader from './components/AppLoader.vue'

const { isInitialized } = useAppInit();
const appSettings = useSettingsStore();
useFilesWatcher();
</script>

<template>
  <AppLoader v-if="!isInitialized || !appSettings.vaultPath" />
  <LoadedApp v-if="isInitialized" />
</template>
