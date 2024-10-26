import { promisify } from 'util'
import fs from 'fs';
import path from 'path'
import { BrowserWindow  } from 'electron';
import chokidar from 'chokidar'


const mkdir = promisify(fs.mkdir);

export const createDirectory = (dirPath: string) => {
  return mkdir(dirPath, { recursive: true });
}

export const getMainWindow = () => {
  const windows = BrowserWindow.getAllWindows();
  return windows[0];
}

export const listFiles = (currentPath) => {
  const results: string[] = [];
  const items = fs.readdirSync(currentPath);
  for (const item of items) {
    const fullPath = path.join(currentPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      listFiles(fullPath);
    } else if (stat.isFile() && path.extname(fullPath) === '.md') {
      results.push(fullPath);
    }
  }
  return results
};

export const watchDirectory = (directoryPath, callback: () => void) => {
  const watcher = chokidar.watch(directoryPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });
  watcher
    .on('add', callback)
    .on('addDir', callback)
    .on('change', callback)
    .on('unlink', callback)
    .on('unlinkDir', callback)
  return watcher
};