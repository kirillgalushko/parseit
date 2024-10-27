import { ipcMain, dialog, app  } from 'electron';
import sanitizeFilename from 'sanitize-filename';
import path from 'path';
import { writeFile } from './files.ts';
import { createDirectory, getMainWindow } from './utils.ts';
import { getSettings } from './settings.ts'

const DEFAULT_VAULT_NAME = 'Parseit'
const ARCHIVE_DIR_NAME = '.archive'
const DEFAULT_DIR_NAME = 'Сохранено'

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
  await createDirectory(path.join(chosenPath, ARCHIVE_DIR_NAME));
  await createDirectory(path.join(chosenPath, DEFAULT_DIR_NAME));
  return appDataPath;
}

export const createParseitFile = async (name: string, content: string) => {
  const vaultPath = getSettings().vaultPath
  if (vaultPath) {
    const filePath = path.join(vaultPath, sanitizeFilename(name) + '.md')
    await writeFile(filePath, content)
  } else {
    throw new Error(`Can't create a file: ${name}`)
  }
}

export default () => {
  ipcMain.handle('create-app-vault', createAppVault);
  ipcMain.handle('create-app-file', (_event, name: string, content: string) => createParseitFile(name, content));
}
