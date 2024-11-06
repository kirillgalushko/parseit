<script setup lang="ts">
import AppLoader from 'src/web/AppLoader.vue'
import { useAppInit } from 'src/web/hooks/useAppInit'
import { useAppTheme } from 'src/web/hooks/useAppTheme'
import { useFilesWatcher } from 'src/web/hooks/useFilesWatcher'
import LoadedApp from 'src/web/LoadedApp.vue'
import { useSettingsStore } from 'src/web/stores/settingsStore'

useAppTheme()
const { isInitialized } = useAppInit()
const appSettings = useSettingsStore()
useFilesWatcher()
</script>

<template>
  <AppLoader v-if="!isInitialized || !appSettings.vaultPath" />
  <LoadedApp v-if="isInitialized" />
</template>
