import { ipcMain  } from 'electron';
import fs from 'fs';
import { listFiles } from './utils.ts';
import { type ParseitFile } from '../../common/types.ts'
import { getFileName, getFileExtension } from './utils.ts'

export const readFile = async (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    throw error;
  }
}

export const writeFile = async (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error('Ошибка записи файла:', error);
    throw error;
  }
}

export const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error('Ошибка при удалении файла:', error);
    throw error;
  }
};

export const getAllFiles = async (directory: string) => {
  const allFilesList = await listFiles(directory)
  const filesWithContent: ParseitFile[] = [];
  for (const filePath of allFilesList) {
    const fileContent = await readFile(filePath);
    const name = getFileName(filePath)
    const extension = getFileExtension(filePath)
    filesWithContent.push({ filePath, content: fileContent, name, extension })
  }
  return filesWithContent
}

export default () => {
  ipcMain.handle('read-file', (_event, filePath: string) => readFile(filePath));
  ipcMain.handle('write-file', (_event, filePath: string, content: string) => writeFile(filePath, content));
  ipcMain.handle('delete-file', (_event, filePath: string) => deleteFile(filePath));
  ipcMain.handle('get-all-files', (_event, directoryPath: string) => getAllFiles(directoryPath));
}
