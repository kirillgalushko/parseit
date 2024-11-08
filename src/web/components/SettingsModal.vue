<script setup lang="ts">
import {
  Modal,
  Input,
  Button,
  Stack,
  Gap,
  Tooltip,
  Select,
  SelectOption,
  RegisteredOption
} from '@gui/components'
import { storeToRefs } from 'pinia'
import { AppTheme } from 'src/common/types'
import { useSettingsStore } from 'src/web/stores/settingsStore'
import { isDesktopApp } from 'src/web/utils/isDesktopApp'

const settingsStore = useSettingsStore()
const { vaultPath } = storeToRefs(settingsStore)

const handleAddVault = async () => {
  if (isDesktopApp()) {
    const vaultPath = await window.api.createAppVault()
    if (vaultPath) {
      settingsStore.setSettingsItem('vaultPath', vaultPath)
    }
  }
}

const handleChangeTheme = (theme: RegisteredOption) => {
  settingsStore.setSettingsItem('theme', theme.value as AppTheme)
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
    <Gap :default="4" direction="vertical" />
    Тема оформления:
    <Gap :default="2" direction="vertical" />
    <Select :value="settingsStore.theme" @change="handleChangeTheme">
      <SelectOption value="dark" label="Тёмная тема" />
      <SelectOption value="light" label="Светлая тема" />
    </Select>
  </Modal>
</template>

<style scoped>
.tooltip-wrapper {
  width: 100%;
}
</style>
