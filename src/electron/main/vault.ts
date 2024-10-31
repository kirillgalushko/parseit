import { ipcMain, dialog, app  } from 'electron';
import sanitizeFilename from 'sanitize-filename';
import path from 'path';
import { createFile } from 'src/electron/main/files.ts';
import { createDirectory, getMainWindow } from 'src/electron/main/utils.ts';
import { getSettings } from 'src/electron/main/settings.ts'
import { ARCHIVE_DIR_NAME, DEFAULT_DIR_NAME, DEFAULT_VAULT_NAME } from 'src/common/constants.ts'
import { eventBus } from 'src/electron/main/eventBus.ts';

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
  await createDirectory(path.join(appDataPath, ARCHIVE_DIR_NAME));
  await createDirectory(path.join(appDataPath, DEFAULT_DIR_NAME));
  eventBus.emit('vault:created', appDataPath);
  return appDataPath;
}

export const createParseitFile = async (name: string, content: string, folderName?: string) => {
  const vaultPath = (await getSettings()).vaultPath
  if (vaultPath) {
    const filePath = path.join(vaultPath, (folderName || DEFAULT_DIR_NAME), sanitizeFilename(name) + '.md')
    await createFile(filePath, content)
  } else {
    throw new Error(`Can't create a file: ${name}`)
  }
}

export default () => {
  ipcMain.handle('create-app-vault', createAppVault);
  ipcMain.handle('create-app-file', (_event, name: string, content: string, folderName?: string) => createParseitFile(name, content, folderName));
}
