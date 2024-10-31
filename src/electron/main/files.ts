import fs from 'fs'
import path from 'path'
import { ipcMain } from 'electron'
import { ARCHIVE_DIR_NAME, DEFAULT_DIR_NAME } from 'src/common/constants.ts'
import { type ParseitFile, type ParseitFolder } from 'src/common/types.ts'
import { getSettings } from 'src/electron/main/settings.ts'
import {
  listFiles,
  listFolders,
  moveFile,
  getFileName,
  getFileExtension,
  writeFileWithDirs,
  getUniqueFileName
} from 'src/electron/main/utils.ts'

export const readFile = async (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return data
  } catch (error) {
    console.error('Ошибка чтения файла:', error)
    throw error
  }
}

export const writeFile = async (filePath, content) => {
  try {
    writeFileWithDirs(filePath, content)
  } catch (error) {
    console.error('Ошибка записи файла:', error)
    throw error
  }
}

export const createFile = async (filePath, content) => {
  try {
    writeFileWithDirs(getUniqueFileName(filePath), content)
  } catch (error) {
    console.error('Ошибка записи файла:', error)
    throw error
  }
}

export const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath)
  } catch (error) {
    console.error('Ошибка при удалении файла:', error)
    throw error
  }
}

export const archiveFile = async (filePath) => {
  try {
    const vaultPath = (await getSettings()).vaultPath
    const fileName = path.basename(filePath)
    if (!vaultPath) throw new Error('No vault path')
    moveFile(filePath, path.join(vaultPath, ARCHIVE_DIR_NAME, fileName))
  } catch (error) {
    console.error('Ошибка при перемещении файла:', error)
    throw error
  }
}

export const recoverFile = async (filePath) => {
  try {
    const vaultPath = (await getSettings()).vaultPath
    const fileName = path.basename(filePath)
    if (!vaultPath) throw new Error('No vault path')
    moveFile(filePath, path.join(vaultPath, DEFAULT_DIR_NAME, fileName))
  } catch (error) {
    console.error('Ошибка при перемещении файла:', error)
    throw error
  }
}

export const getAllFiles = async (directory: string) => {
  const allFilesList = await listFiles(directory)
  const filesWithContent: ParseitFile[] = []
  for (const filePath of allFilesList) {
    const fileContent = await readFile(filePath)
    const name = getFileName(filePath)
    const extension = getFileExtension(filePath)
    filesWithContent.push({ filePath, content: fileContent, name, extension })
  }
  return filesWithContent
}

export const getAllFolders = async (directory: string) => {
  const allFoldersList = await listFolders(directory)
  const folderWithInfo: ParseitFolder[] = []
  for (const folderPath of allFoldersList) {
    const files = await listFiles(folderPath)
    const realName = getFileName(folderPath)
    const name = realName === ARCHIVE_DIR_NAME ? 'Архив' : realName
    folderWithInfo.push({ filesCount: files.length, folderPath, name })
  }
  return folderWithInfo
}

export default () => {
  ipcMain.handle('read-file', (_event, filePath: string) => readFile(filePath))
  ipcMain.handle('write-file', (_event, filePath: string, content: string) =>
    writeFile(filePath, content)
  )
  ipcMain.handle('delete-file', (_event, filePath: string) => deleteFile(filePath))
  ipcMain.handle('archive-file', (_event, filePath: string) => archiveFile(filePath))
  ipcMain.handle('recover-file', (_event, filePath: string) => recoverFile(filePath))
  ipcMain.handle('get-all-files', (_event, directoryPath: string) => getAllFiles(directoryPath))
  ipcMain.handle('get-all-folders', (_event, directoryPath: string) => getAllFolders(directoryPath))
}
