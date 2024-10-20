import { Readability } from '@mozilla/readability';

const parseWebpage = async (url: string) => {
  const proxyUrl = `http://localhost:3122/proxy?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(proxyUrl);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const reader = new Readability(doc);
    return reader.parse();
  } catch (error) {
    console.error('Ошибка при извлечении контента:', error);
  }
}

export default parseWebpage