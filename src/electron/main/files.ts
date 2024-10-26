import { ipcMain  } from 'electron';
import fs from 'fs';

export const readFile = async (_event, filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    throw error;
  }
}

export default () => {
  ipcMain.handle('read-file', readFile);
}
