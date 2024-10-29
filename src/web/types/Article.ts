export interface Article {
  id: string;
  name: string;
  markdown: string;
  filePath: string;
}

export type ViewVariant = 'editor' | 'reader'
