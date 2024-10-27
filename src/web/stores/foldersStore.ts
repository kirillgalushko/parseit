import { defineStore } from 'pinia';
import { useSettingsStore } from './settingsStore';
import { StateWithInitialization } from './types'
import { isDesktopApp } from '../utils/isDesktopApp'
import { ParseitFolder } from '../../common/types';

interface Folder extends ParseitFolder {}

interface FolderState extends StateWithInitialization {
  folders: Folder[],
  selectedFolder: Folder | null,
}

export const useFoldersStore = defineStore('foldersStore', {
  state: (): FolderState => ({
    folders: [],
    selectedFolder: null,
    _initialized: false,
  }),
  actions: {
    async init() {
      if (isDesktopApp()) {
        const settings = useSettingsStore();
        if (settings.vaultPath) {
          const folders = await window.api.getAllFolders(settings.vaultPath);
          this.folders = folders
          if (folders.length) {
            this.selectedFolder = folders[0];
          }
        }
      }
      this._initialized = true;
    },
    async updateFolders() {
      const settings = useSettingsStore();
        if (settings.vaultPath) {
          const folders = await window.api.getAllFolders(settings.vaultPath);
          this.folders = folders
        }
        if (this.selectedFolder && !this.folders.find(a => a.folderPath === this.selectedFolder?.folderPath)) {
          this.selectedFolder = null
        }
    },
    addFolder(folder: Folder) {
      // this.articles.push(article);
    },
    createFolder(name: string) {
      if (isDesktopApp()) {
          // window.api.createFolder(name)
      }
    },
    removeFolder(folder: Folder) {
      if (isDesktopApp()) {
        // window.api.deleteFolder(folder.folderPath);
      } else {
        // this.folders = this.folders.filter(a => a.id !== folder.id)
        // if (this.selectedFolder?.id === folder.id) {
        //   this.selectedFolder = null;
        // }
      }
    },
    // updateFolder(folder: Folder) {
    //   if (isDesktopApp()) {
    //     window.api.renameFolder(folder.filePath, folder)
    //   } else {
    //     const changedFolderIndex = this.folders.findIndex(a => a.id === folder.id)
    //     if (changedFolderIndex) {
    //       this.folders[changedFolderIndex] = folder
    //     } 
    //   }
    // },
    setSelectedFolder(folder: Folder | null) {
      this.selectedFolder = folder;
    },
  },
})

