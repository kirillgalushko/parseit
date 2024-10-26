import { promisify } from 'util'
import fs from 'fs';
import { BrowserWindow  } from 'electron';


const mkdir = promisify(fs.mkdir);

export const createDirectory = (dirPath: string) => {
  return mkdir(dirPath, { recursive: true });
}

export const getMainWindow = () => {
  const windows = BrowserWindow.getAllWindows();
  return windows[1];
}