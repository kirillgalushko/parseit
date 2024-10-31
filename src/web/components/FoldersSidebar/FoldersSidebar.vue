<script setup lang="ts">
import { Sidebar, Gap, Icon, SidebarItem, SidebarList } from 'gui'
import Header from 'src/web/components/Header.vue'
import Logo from 'src/web/components/Logo.vue'
import { useFoldersStore } from 'src/web/stores/foldersStore'
import FolderFilesCount from 'src/web/components/FoldersSidebar/FolderFilesCount.vue'
import { isArchiveFolder } from 'src/web/utils/isArchive'
import SettingsModal from 'src/web/components/Settings/SettingsModal.vue'
import { computed, ref } from 'vue'
import { ParseitFolder } from 'src/common/types'

const foldersStore = useFoldersStore();
const isSettingsOpened = ref<boolean>(false);
const sortedFolders = computed(() => {
  // O(n)
  let archiveFolder: ParseitFolder | null = null;
  const nonArchiveFolders: ParseitFolder[] = [];
  for (const folder of foldersStore.folders) {
    if (isArchiveFolder(folder)) {
      archiveFolder = folder;
    } else {
      nonArchiveFolders.push(folder);
    }
  }
  if (archiveFolder) {
    nonArchiveFolders.push(archiveFolder);
  }
  return nonArchiveFolders;
});

const handleOpenSettings = () => {
  isSettingsOpened.value = true
}

const handleCloseSettings = () => {
  isSettingsOpened.value = false
}
</script>

<template>
  <Sidebar :compactWidth="120" :width="150" minWidth="80px" maxWidth="300px" :padding="8">
    <Header>
      <Logo />
    </Header>
    <Gap direction="vertical" :default="4" />
    <SidebarList>
      <SidebarItem v-for="folder of sortedFolders"
        :selected="foldersStore.selectedFolder?.folderPath === folder.folderPath"
        @click="() => foldersStore.setSelectedFolder(folder)">
        <template #left>
          <Icon :name="isArchiveFolder(folder) ? 'archive' : 'folder'" />
        </template>
        {{ folder.name }}
        <template #right>
          <FolderFilesCount>{{ folder.filesCount }}</FolderFilesCount>
        </template>
      </SidebarItem>
      <SidebarItem @click="handleOpenSettings">
        <template #left>
          <Icon name="settings" />
        </template>
        Настройки
      </SidebarItem>
    </SidebarList>
    <SettingsModal :isOpened="isSettingsOpened" :onClose="handleCloseSettings" />
  </Sidebar>
</template>

<style scoped></style>