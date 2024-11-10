import { defineStore } from 'pinia'
import { ParseitFolder } from 'src/common/types'
import { useSettingsStore } from 'src/web/stores/settingsStore'
import { StateWithInitialization } from 'src/web/stores/types'
import { isArchiveFolder } from 'src/web/utils/isArchive'

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
      const settings = useSettingsStore()
      if (settings.vaultPath) {
        const folders = await window.api.getAllFolders(settings.vaultPath)
        this.folders = folders
        if (folders.length) {
          this.selectedFolder = folders.find((f) => !isArchiveFolder(f)) ?? null
        }
      }
      this._initialized = true
    },
    async updateFolders() {
      const settings = useSettingsStore()
      if (settings.vaultPath) {
        const folders = await window.api.getAllFolders(settings.vaultPath)
        this.folders = [...folders]
      }
      if (
        this.selectedFolder &&
        !this.folders.find((a) => a.folderPath === this.selectedFolder?.folderPath)
      ) {
        this.selectedFolder = null
      }
    },
    setSelectedFolder(folder: Folder | null) {
      this.selectedFolder = folder
    }
  }
})
