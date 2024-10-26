export interface Article {
  id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  textContent?: string;
  originalHtml?: string;
  markdown?: string;
  originalUrl?: string;
  domain?: string;
  faviconUrl?: string;
}

export type ViewVariant = 'html' | 'reader'
