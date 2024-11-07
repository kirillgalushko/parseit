import readmeMarkdown from 'src/../README.md?raw'
import { ARCHIVE_DIR_NAME, DEFAULT_DIR_NAME } from 'src/common/constants'
import { ParseitFile, ParseitFolder, Settings } from 'src/common/types'
import demoMarkdown from '../assets/demo/demo.md?raw'
import example1Markdown from '../assets/demo/example1.md?raw'
import example2Markdown from '../assets/demo/example2.md?raw'
import example3Markdown from '../assets/demo/example3.md?raw'
import metaMarkdown from '../assets/demo/meta.md?raw'
import mockedArticleHtml from '../assets/demo/mockedArticle.html?raw'

const MOCKED_SETTINGS: Settings = {
  theme: 'dark',
  vaultPath: 'fake/vault/path'
} as const

const DEFAULT_DIR_FULL_PATH = MOCKED_SETTINGS.vaultPath + '/' + DEFAULT_DIR_NAME
const ARCHIVE_FULL_PATH = MOCKED_SETTINGS.vaultPath + '/' + ARCHIVE_DIR_NAME

const MOCKED_FOLDERS: ParseitFolder[] = [
  {
    name: DEFAULT_DIR_NAME,
    folderPath: DEFAULT_DIR_FULL_PATH,
    filesCount: 0
  },
  {
    name: 'Архив',
    folderPath: ARCHIVE_FULL_PATH,
    filesCount: 0
  }
]

const MOCKED_FILES: ParseitFile[] = [
  {
    name: 'Демо режим',
    filePath: DEFAULT_DIR_FULL_PATH + '/demo',
    content: demoMarkdown,
    extension: '.md'
  },
  {
    name: 'Parseit',
    filePath: DEFAULT_DIR_FULL_PATH + '/reademe',
    content: metaMarkdown + readmeMarkdown,
    extension: '.md'
  },
  {
    name: 'Дональд Трамп победил',
    filePath: ARCHIVE_FULL_PATH + '/example1',
    content: example1Markdown,
    extension: '.md'
  },
  {
    name: 'Каких домашних животных держат россияне',
    filePath: DEFAULT_DIR_FULL_PATH + '/example2',
    content: example2Markdown,
    extension: '.md'
  },
  {
    name: 'Зачем в iPhone чип, который убивает FaceID',
    filePath: DEFAULT_DIR_FULL_PATH + '/example3',
    content: example3Markdown,
    extension: '.md'
  }
]

const getFile = (filePath) => {
  return MOCKED_FILES.find((file) => file.filePath === filePath)
}

let parsedPages = 0
let onFilesUpdated = () => {}

export const mockElectronApi = () => {
  window.api = {
    readFile: (filePath) => {
      console.log(`Mock readFile called with path: ${filePath}`)
      return Promise.resolve(getFile(filePath)?.content as string)
    },
    writeFile: (filePath, content) => {
      console.log(`Mock writeFile called with path: ${filePath}, content: ${content}`)
      const file = getFile(filePath)
      if (file) {
        file.content = content
      } else {
        MOCKED_FILES.push({
          name: 'Новый файл',
          filePath,
          content,
          extension: '.md'
        })
      }

      onFilesUpdated()
      return Promise.resolve()
    },
    deleteFile: (filePath) => {
      console.log(`Mock deleteFile called with path: ${filePath}`)
      const fileIndex = MOCKED_FILES.findIndex((file) => file.filePath === filePath)
      if (fileIndex !== -1) {
        MOCKED_FILES.splice(fileIndex, 1)
      }
      onFilesUpdated()
      return Promise.resolve()
    },
    archiveFile: (filePath) => {
      console.log(`Mock archiveFile called with path: ${filePath}`)
      const file = getFile(filePath)
      if (file) {
        file.filePath = ARCHIVE_FULL_PATH
      }
      onFilesUpdated()
      return Promise.resolve()
    },
    recoverFile: (filePath) => {
      console.log(`Mock recoverFile called with path: ${filePath}`)
      const file = getFile(filePath)
      if (file) {
        file.filePath = DEFAULT_DIR_FULL_PATH
      }
      onFilesUpdated()
      return Promise.resolve()
    },
    getAllFiles: (directory) => {
      console.log(`Mock getAllFiles called with directory: ${directory}`)
      const files = MOCKED_FILES.filter((mockedFile) => mockedFile.filePath.includes(directory))
      return Promise.resolve(files)
    },
    getAllFolders: (directory) => {
      console.log(`Mock getAllFolders called with directory: ${directory}`)
      MOCKED_FOLDERS.forEach((folder) => {
        folder.filesCount = MOCKED_FILES.filter((file) =>
          file.filePath.includes(folder.folderPath)
        ).length
      })
      return Promise.resolve(MOCKED_FOLDERS)
    },
    onFilesUpdated: (callback) => {
      console.log(`Mock onFilesUpdated called`)
      onFilesUpdated = callback
    },
    createAppVault: () => {
      console.log(`Mock createAppVault called`)
      return Promise.resolve(MOCKED_SETTINGS.vaultPath as string)
    },
    createAppFile: (fileName, content, folderName) => {
      console.log(
        `Mock createAppFile called with fileName: ${fileName}, content: ${content}, folderName: ${folderName}`
      )
      const postfix = parsedPages ? ` ${parsedPages + 1}` : ''
      MOCKED_FILES.push({
        name: fileName + postfix,
        filePath: DEFAULT_DIR_FULL_PATH + '/' + fileName + postfix,
        content,
        extension: '.md'
      })
      parsedPages += 1
      onFilesUpdated()
      return Promise.resolve()
    },
    getSettings: () => {
      console.log(`Mock getSettings called`)
      return Promise.resolve(MOCKED_SETTINGS)
    },
    setSettings: (settings) => {
      console.log(`Mock setSettings called with settings:`, settings)
      return Promise.resolve()
    },
    fetchHtml: (url) => {
      console.log(`Mock fetchHtml called with url: ${url}`)
      return Promise.resolve(mockedArticleHtml)
    }
  }
}
