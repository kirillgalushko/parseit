import { defineStore } from 'pinia'
import { ParseitFolder } from 'src/common/types'
import { useSettingsStore } from 'src/web/stores/settingsStore'
import { StateWithInitialization } from 'src/web/stores/types'
import { isArchiveFolder } from 'src/web/utils/isArchive'
import { isDesktopApp } from 'src/web/utils/isDesktopApp'

interface Folder extends ParseitFolder {}

interface FolderState extends StateWithInitialization {
  folders: Folder[]
  selectedFolder: Folder | null
}

export const useFoldersStore = defineStore('foldersStore', {
  state: (): FolderState => ({
    folders: [],
    selectedFolder: null,
    _initialized: false
  }),
  actions: {
    async init() {
      if (isDesktopApp()) {
        const settings = useSettingsStore()
        if (settings.vaultPath) {
          const folders = await window.api.getAllFolders(settings.vaultPath)
          this.folders = folders
          if (folders.length) {
            this.selectedFolder = folders.find((f) => !isArchiveFolder(f)) ?? null
          }
        }
      }
      this._initialized = true
    },
    async updateFolders() {
      const settings = useSettingsStore()
      if (settings.vaultPath) {
        const folders = await window.api.getAllFolders(settings.vaultPath)
        this.folders = folders
      }
      if (
        this.selectedFolder &&
        !this.folders.find((a) => a.folderPath === this.selectedFolder?.folderPath)
      ) {
        this.selectedFolder = null
      }
    },
    addFolder(_folder: Folder) {
      // this.articles.push(article);
    },
    createFolder(_name: string) {
      if (isDesktopApp()) {
        // window.api.createFolder(name)
      }
    },
    removeFolder(_folder: Folder) {
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
      this.selectedFolder = folder
    }
  }
})
