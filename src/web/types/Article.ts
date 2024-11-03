export interface Article {
  id: string
  name: string
  markdown: string
  filePath: string
  body: string
  excerpt: string
  url?: string
  domain?: string
  faviconUrl?: string
  createdAt?: string
  author?: string
  siteName?: string
}

export type ViewVariant = 'editor' | 'reader'
