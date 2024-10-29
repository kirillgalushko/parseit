export interface Article {
  id: string;
  name: string;
  markdown: string;
  filePath: string;
  body: string;
  url?: string;
}

export type ViewVariant = 'editor' | 'reader'
