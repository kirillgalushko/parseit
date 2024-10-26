import { ipcMain, dialog, app  } from 'electron';
import path from 'path';
import { createDirectory, getMainWindow } from './utils.ts';

const DEFAULT_VAULT_NAME = 'Parseit'

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

export const createAppVault = async () => {
  const chosenPath = await askAppPath();
  const appDataPath = path.join(chosenPath, DEFAULT_VAULT_NAME)
  await createDirectory(appDataPath);
  return appDataPath;
}

export default () => {
  ipcMain.handle('create-app-vault', createAppVault);
}
