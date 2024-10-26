import { ref } from "vue";
import { useArticleStore } from "../stores/articleStore";
import TurndownService from 'turndown';
import parseWebpage from '../api/parseWebpage';
import { ParsedWebpage } from "../types/ParsedWebpage";

const convertParsedWebpageToMarkdown = (page: ParsedWebpage): string => {
  const turndownService = new TurndownService({ headingStyle: 'atx' });
  const markdown = turndownService.turndown(page.content);
  return markdown
}

export const useAddArticle = () => {
  const articleUrl = ref<string>('')
  const articleStore = useArticleStore();

  const parsePageAndCreateArticle = async (url: string) => {
    const page = await parseWebpage(url)
    if (page) {
      const markdown = convertParsedWebpageToMarkdown(page);
      const name = page.title || page.excerpt || page.domain
      if (name) {
        articleStore.createArticle(name, markdown)
      } else {
        throw new Error('No name found for webpage')
      }
    }
  }
  
  const handleAddArticle = () => {
    if (articleUrl.value) {
      parsePageAndCreateArticle(articleUrl.value)
      articleUrl.value = ''
    }
  }

  return { articleUrl, addArticle: handleAddArticle, parsePageAndCreateArticle }
}