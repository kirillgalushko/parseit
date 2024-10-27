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
    if (stat.isFile() && path.extname(fullPath) === '.md') {
      results.push(fullPath);
    }
  }
  return results
};

export const listFolders = (currentPath) => {
  const results: string[] = [];
  const items = fs.readdirSync(currentPath);
  for (const item of items) {
    const fullPath = path.join(currentPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(fullPath)
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

export const getFileExtension = (filePath: string): string => {
  return path.extname(filePath)
}

export const getFileName = (filePath: string): string => {
  return path.basename(filePath, path.extname(filePath));
}

export const writeFileWithDirs = (filePath, data) => {
  const dir = path.dirname(filePath);

  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(filePath, data, 'utf8', (err) => {
      if (err) throw err;
    });
  });
};

export function getUniqueFileName(filePath, count = 1) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const newFilePath = count === 1 ? filePath : path.join(dir, `${baseName}_${count}${ext}`);

  return fs.existsSync(newFilePath) ? getUniqueFileName(filePath, count + 1) : newFilePath;
}
