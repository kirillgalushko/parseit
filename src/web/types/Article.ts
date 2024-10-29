export interface Article {
  id: string;
  name: string;
  markdown: string;
  filePath: string;
  body: string;
  url?: string;
  domain?: string;
  faviconUrl?: string;
  createdAt?: string;
}

export type ViewVariant = 'editor' | 'reader'
