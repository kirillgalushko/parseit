<script setup lang="ts">
import { Modal, Button, Input, Gap, Stack } from '@gui/components'
import { useSettingsStore } from 'src/web/stores/settingsStore'
import { isDesktopApp } from 'src/web/utils/isDesktopApp'

const settingsStore = useSettingsStore()

const handleAddVault = async () => {
  if (isDesktopApp()) {
    const vaultPath = await window.api.createAppVault()
    if (vaultPath) {
      settingsStore.setSettingsItem('vaultPath', vaultPath)
    }
  }
}
</script>

<template>
  <Modal :isOpened="!settingsStore.vaultPath" title="Создайте хранилище">
    Для работы приложения выберите, где разместить хранилище.
    <Gap :default="3" direction="vertical" />
    <Stack direction="row" :gap="2" stretched>
      <Input readonly placeholder="/Documents" stretched @click="handleAddVault" />
      <Button mode="accent" @click="handleAddVault"> Создать </Button>
    </Stack>
  </Modal>
</template>
