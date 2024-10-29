<script setup lang="ts">
import { Sidebar, Gap, Icon, SidebarItem, SidebarList } from 'gui'
import Header from '../Header.vue'
import Logo from '../Logo.vue'
import { useFoldersStore } from '../../stores/foldersStore'
import FolderFilesCount from './FolderFilesCount.vue'

const foldersStore = useFoldersStore();
</script>

<template>
  <Sidebar :compactWidth="120" :width="150" minWidth="80px" maxWidth="300px" :padding="8">
    <Header>
      <Logo />
    </Header>
    <Gap direction="vertical" :default="4" />
    <SidebarList>
      <SidebarItem v-for="folder of foldersStore.folders"
        :selected="foldersStore.selectedFolder?.folderPath === folder.folderPath"
        @click="() => foldersStore.setSelectedFolder(folder)">
        <template #left>
          <Icon name="folder" />
        </template>
        {{ folder.name }}
        <template #right>
          <FolderFilesCount>{{ folder.filesCount }}</FolderFilesCount>
        </template>
      </SidebarItem>
    </SidebarList>
  </Sidebar>
</template>

<style scoped></style>