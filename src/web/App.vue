<script setup lang="ts">

import { watch } from 'vue'
import { useSettingsStore } from './stores/settingsStore'
import { useAppInit } from './hooks/useAppInit'
import { useFilesWatcher } from './hooks/useFilesWatcher'
import LoadedApp from './LoadedApp.vue'

const { isInitialized } = useAppInit();
const appSettings = useSettingsStore();
useFilesWatcher();

const checkForSettings = async () => {
  if (!appSettings.vaultPath) {
    const vaultPath = await window.api.createAppVault();
    if (vaultPath) {
      appSettings.setSettingsItem('vaultPath', vaultPath);
    }
  }
}

watch(() => isInitialized, () => {
  checkForSettings()
})
</script>

<template>
  <div v-if="!isInitialized">
    Loading...
  </div>
  <LoadedApp v-if="isInitialized" />
</template>
