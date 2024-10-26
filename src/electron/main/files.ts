import { ipcMain  } from 'electron';
import fs from 'fs';
import { listFiles } from './utils.ts';

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
    console.log(filePath)
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    console.error('Ошибка записи файла:', error);
    throw error;
  }
}

export const getAllFiles = async (directory: string) => {
  const allFilesList = await listFiles(directory)
  const filesWithContent = [];
  for (const filePath of allFilesList) {
    const fileContent = await readFile(filePath);
    filesWithContent.push({ path: filePath, content: fileContent })
  }
  return filesWithContent
}

export default () => {
  ipcMain.handle('read-file', (_event, filePath) => readFile(filePath));
  ipcMain.handle('write-file', (_event, filePath, content) => writeFile(filePath, content));
  ipcMain.handle('get-all-files', (_event, directoryPath) => getAllFiles(directoryPath));
}
