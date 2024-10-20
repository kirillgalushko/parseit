import { Readability } from '@mozilla/readability';

const parseWebpage = async (url: string) => {
  try {
    const response = await fetch(url);
    console.log(response)
    const html = await response.text();
    console.log(html)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const reader = new Readability(doc);
    return reader.parse();
  } catch (error) {
    console.error('Ошибка при извлечении контента:', error);
  }
}

export default parseWebpage