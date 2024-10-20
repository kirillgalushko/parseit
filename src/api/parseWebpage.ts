import { Readability } from '@mozilla/readability';

const parseWebpage = async (url: string) => {
  const proxyUrl = `http://localhost:3122/proxy?url=${encodeURIComponent(url)}`;

  try {
    const parsedUrl = new URL(url);
    const domain = `${parsedUrl.protocol}//${parsedUrl.host}`;
    const response = await fetch(proxyUrl);
    const html = await response.text();
    const htmlWithFixedDomain = html.replace(/(src|href|srcset)=(["'])(\/[^"']*)\2/g, (_match, p1, p2, p3) => {
      const newValue = `${domain}${p3}`;
      return `${p1}=${p2}${newValue}${p2}`;
    });
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlWithFixedDomain, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      if (img.hasAttribute('src') && img.hasAttribute('srcset')) {
        img.removeAttribute('srcset');
      }
    });
    const reader = new Readability(doc);
    return reader.parse();
  } catch (error) {
    console.error('Ошибка при извлечении контента:', error);
  }
}

export default parseWebpage