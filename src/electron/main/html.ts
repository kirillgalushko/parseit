import { ipcMain } from 'electron'

export const fetchHtml = async (url: string) => {
  const response = await fetch(url)
  const html = await response.text()
  return html
}

export default () => {
  ipcMain.handle('fetch-html', (_event, url) => fetchHtml(url))
}
