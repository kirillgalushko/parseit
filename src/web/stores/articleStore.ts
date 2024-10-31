import { defineStore } from 'pinia';
import { Article, ViewVariant } from 'src/web/types/Article';
import yaml from 'js-yaml';
import { useFoldersStore } from 'src/web/stores/foldersStore';
import { StateWithInitialization } from 'src/web/stores/types';
import { isDesktopApp } from 'src/web/utils/isDesktopApp';
import { ParseitFile } from 'src/common/types';
import { ARCHIVE_DIR_NAME } from 'src/common/constants';

interface ArticleState extends StateWithInitialization {
  articles: Article[],
  selectedArticle: Article | null,
  articleView: ViewVariant,
}

function parseMarkdownWithYaml(content: string) {
  const match = content.match(/^-{3}\n([\s\S]*?)\n-{3}/);
  if (!match) {
    return { meta: null, content };
  }
  const yamlContent = match[1];
  const body = content.replace(match[0], '').trim();
  const meta = yaml.load(yamlContent);
  return { meta, body };
}

const convertParseitFileToArticle = (file: ParseitFile): Article => {
  const { meta, body } = parseMarkdownWithYaml(file.content);
  return {
    id: file.filePath,
    name: file.name,
    markdown: file.content,
    filePath: file.filePath,
    body: body || file.content,
    url: meta?.url,
    faviconUrl: meta?.faviconUrl,
    domain: meta?.domain,
    createdAt: meta?.createdAt,
  }
}

export const useArticleStore = defineStore('articleStore', {
  state: (): ArticleState => ({
    articles: [] as Article[],
    selectedArticle: null,
    articleView: 'reader',
    _initialized: false,
  }),
  actions: {
    async init() {
      if (isDesktopApp()) {
        const foldersStore = useFoldersStore();
        if (foldersStore.selectedFolder) {
          const files = await window.api.getAllFiles(foldersStore.selectedFolder.folderPath);
          const articles: Article[] = files.map(convertParseitFileToArticle) 
          this.articles = articles
        }
      }
      this._initialized = true;
    },
    async updateArticles() {
      if (isDesktopApp()) {
        const foldersStore = useFoldersStore();
        if (foldersStore.selectedFolder) {
          const files = await window.api.getAllFiles(foldersStore.selectedFolder.folderPath);
          const articles: Article[] = files.map(convertParseitFileToArticle) 
          this.articles = articles
        }
      }
      if (this.selectedArticle && !this.articles.find(a => a.id === this.selectedArticle?.id)) {
        this.selectedArticle = null
      }
    },
    addArticle(article: Article) {
      this.articles.push(article);
    },
    createArticle(name: string, content: string) {
      if (isDesktopApp()) {
        const foldersStore = useFoldersStore();
        if (foldersStore.selectedFolder?.folderPath.includes(ARCHIVE_DIR_NAME)) {
          window.api.createAppFile(name, content)
        } else {
          window.api.createAppFile(name, content, foldersStore.selectedFolder?.name)
        }
      }
    },
    removeArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.deleteFile(article.filePath);
      } else {
        this.articles = this.articles.filter(a => a.id !== article.id)
        if (this.selectedArticle?.id === article.id) {
          this.selectedArticle = null;
        }
      }
    },
    archiveArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.archiveFile(article.filePath);
      }
    },
    recoverArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.recoverFile(article.filePath);
      }
    },
    updateArticle(article: Article) {
      if (isDesktopApp()) {
        window.api.writeFile(article.filePath, article.markdown)
      } else {
        const changedArticleIndex = this.articles.findIndex(a => a.id === article.id)
        if (changedArticleIndex) {
          this.articles[changedArticleIndex] = article
        } 
      }
    },
    setSelectedArticle(article: Article | null) {
      this.selectedArticle = article;
    },
    setArticleView(articleView: ViewVariant) {
      this.articleView = articleView;
    },
  },
})

