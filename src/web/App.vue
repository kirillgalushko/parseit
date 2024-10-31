<script setup lang="ts">

import { useSettingsStore } from 'src/web/stores/settingsStore';
import { useAppInit } from 'src/web/hooks/useAppInit';
import { useFilesWatcher } from 'src/web/hooks/useFilesWatcher'
import LoadedApp from 'src/web/LoadedApp.vue';
import AppLoader from 'src/web/components/AppLoader.vue';

const { isInitialized } = useAppInit();
const appSettings = useSettingsStore();
useFilesWatcher();
</script>

<template>
  <AppLoader v-if="!isInitialized || !appSettings.vaultPath" />
  <LoadedApp v-if="isInitialized" />
</template>
