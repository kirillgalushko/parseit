<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from 'src/web/stores/settingsStore';
import { Modal, Input, Button, Stack, Gap, Tooltip } from 'gui'
import { isDesktopApp } from 'src/web/utils/isDesktopApp';

const settingsStore = useSettingsStore();
const { vaultPath } = storeToRefs(settingsStore)

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
  <Modal v-bind="$attrs" showCloseButton title="Настройки">
    Выбрать папку как хранилище
    <Gap :default="2" direction="vertical" />
    <Stack direction="row" :gap="2" stretched>
      <Tooltip class="tooltip-wrapper">
        <Input :v-model="vaultPath" :placeholder="vaultPath" />
        <template #popper>
          {{ vaultPath }}
        </template>
      </Tooltip>
      <Button @click="handleAddVault">Выбрать папку</Button>
    </Stack>
  </Modal>
</template>

<style scoped>
.tooltip-wrapper {
  width: 100%;
}
</style>