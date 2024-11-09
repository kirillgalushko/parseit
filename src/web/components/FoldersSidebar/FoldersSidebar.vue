<script setup lang="ts">
import { Sidebar, Gap, SidebarItem, SidebarList } from '@gui/components'
import { IconArchiveOutline, IconFolderOutline, IconSettingsOutline } from '@gui/icons'
import { ParseitFolder } from 'src/common/types'
import FolderFilesCount from 'src/web/components/FoldersSidebar/FolderFilesCount.vue'
import Header from 'src/web/components/Header.vue'
import Logo from 'src/web/components/Logo.vue'
import SettingsModal from 'src/web/components/SettingsModal.vue'
import { useFoldersStore } from 'src/web/stores/foldersStore'
import { isArchiveFolder } from 'src/web/utils/isArchive'
import { computed, ref } from 'vue'

const foldersStore = useFoldersStore()
const isSettingsOpened = ref<boolean>(false)
const sortedFolders = computed(() => {
  // O(n)
  let archiveFolder: ParseitFolder | null = null
  const nonArchiveFolders: ParseitFolder[] = []
  for (const folder of foldersStore.folders) {
    if (isArchiveFolder(folder)) {
      archiveFolder = folder
    } else {
      nonArchiveFolders.push(folder)
    }
  }
  if (archiveFolder) {
    nonArchiveFolders.push(archiveFolder)
  }
  return nonArchiveFolders
})

const handleOpenSettings = () => {
  isSettingsOpened.value = true
}

const handleCloseSettings = () => {
  isSettingsOpened.value = false
}
</script>

<template>
  <Sidebar :compactWidth="120" :width="150" minWidth="80px" maxWidth="300px" :padding="8">
    <div class="sidebar-content">
      <Header>
        <Logo />
      </Header>
      <Gap direction="vertical" :default="4" />
      <div class="folders-list">
        <SidebarList>
          <SidebarItem
            v-for="folder of sortedFolders"
            :selected="foldersStore.selectedFolder?.folderPath === folder.folderPath"
            @click="() => foldersStore.setSelectedFolder(folder)"
          >
            <template #left>
              <component :is="isArchiveFolder(folder) ? IconArchiveOutline : IconFolderOutline" />
            </template>
            {{ folder.name }}
            <template #right>
              <FolderFilesCount>{{ folder.filesCount }}</FolderFilesCount>
            </template>
          </SidebarItem>
          <SidebarItem @click="handleOpenSettings">
            <template #left>
              <IconSettingsOutline />
            </template>
            Настройки
          </SidebarItem>
        </SidebarList>
      </div>
      <SettingsModal :isOpened="isSettingsOpened" :onClose="handleCloseSettings" />
    </div>
  </Sidebar>
</template>

<style scoped>
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.folders-list {
  --sidebar-padding: 8px;
  --half-sidebar-padding: calc(var(--sidebar-padding) / 2);
  overflow-y: auto;
  flex: 1;
  margin-left: calc(0px - var(--sidebar-padding));
  padding-left: var(--sidebar-padding);
  padding-right: var(--half-sidebar-padding);
  margin-right: calc(0px - var(--half-sidebar-padding));
}
</style>
