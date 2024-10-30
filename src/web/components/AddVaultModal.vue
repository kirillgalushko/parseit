<script setup lang="ts">
import Logo from './Logo.vue'
import { Modal, Button, Input, Gap, Stack } from 'gui'
import { useSettingsStore } from '../stores/settingsStore'
import { isDesktopApp } from '../utils/isDesktopApp';

const settingsStore = useSettingsStore();

const handleAddVault = async () => {
  if (isDesktopApp()) {
    const vaultPath = await window.api.createAppVault();
    if (vaultPath) {
      settingsStore.setSettingsItem('vaultPath', vaultPath);
    }
  }
}
</script>

<template>
  <Modal :isOpened="!settingsStore.vaultPath" title="Создайте хранилище">
    Для работы приложения выберите, где разместить хранилище.
    <Gap :default="3" direction="vertical" />
    <Stack direction="row" :gap="2" stretched>
      <Input v-model="settingsStore.vaultPath" stretched />
      <Button mode="accent" @click="handleAddVault">
        Создать
      </Button>
    </Stack>
  </Modal>
</template>
