import { ipcMain, dialog, BrowserWindow, app  } from 'electron';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util'

const DEFAULT_VAULT_NAME = 'Parseit'

const mkdir = promisify(fs.mkdir);

const getMainWindow = () => {
  const windows = BrowserWindow.getAllWindows();
  return windows[1];
}

export const readFile = async (_event, filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    throw error;
  }
}

const askAppPath = async () => {
  const documentsPath = app.getPath('documents');
  const result = await dialog.showOpenDialog(getMainWindow(), {
    title: 'Выберите директорию для хранилища Parseit',
    defaultPath: documentsPath,
    buttonLabel: 'Создать хранилище',
    properties: ['openDirectory', 'createDirectory'],
  });

  if (!result.canceled) {
    return result.filePaths[0]
  }
  throw new Error('Incorrect vault path');
}

const createDirectory = (dirPath: string) => {
  return mkdir(dirPath, { recursive: true });
}

export const createAppVault = async () => {
  const chosenPath = await askAppPath();
  const appDataPath = path.join(chosenPath, DEFAULT_VAULT_NAME)
  await createDirectory(appDataPath);
  return appDataPath;
}

export default () => {
  ipcMain.handle('read-file', readFile);
  ipcMain.handle('create-app-vault', createAppVault);
}
