import { Readability } from '@mozilla/readability'
import { ParsedWebpage } from 'src/web/types/ParsedWebpage'
import { isDesktopApp } from 'src/web/utils/isDesktopApp'

const cleanDoc = (doc: Document) => {
  const images = doc.querySelectorAll('img')
  images.forEach((img) => {
    if (img.hasAttribute('src') && img.hasAttribute('srcset')) {
      img.removeAttribute('srcset')
    }
  })
}

const getDomain = (url: string) => {
  const parsedUrl = new URL(url)
  const domain = `${parsedUrl.protocol}//${parsedUrl.host}`
  return domain
}

const fixHtmlLinksDomain = (domain: string, html: string) => {
  const htmlWithFixedDomain = html.replace(
    /(src|href|srcset)=(["'])(\/[^"']*)\2/g,
    (_match, p1, p2, p3) => {
      const newValue = `${domain}${p3}`
      return `${p1}=${p2}${newValue}${p2}`
    }
  )
  return htmlWithFixedDomain
}

const getHtmlViaProxy = async (url: string) => {
  const proxyUrl = `http://localhost:3122/proxy?url=${encodeURIComponent(url)}`
  const domain = getDomain(url)
  const response = await fetch(proxyUrl)
  const html = await response.text()
  return fixHtmlLinksDomain(domain, html)
}

const getHtmlWithNode = async (url: string) => {
  const html = (await window.api.fetchHtml(url)) as string
  return html
}

const getHtml = async (url: string) => {
  if (isDesktopApp()) {
    return getHtmlWithNode(url)
  }
  return getHtmlViaProxy(url)
}

const htmlToDocument = (html: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc
}

const parseFaviconUrl = (url: string, doc: Document) => {
  const domain = getDomain(url)

  const getFaviconUrl = (linkElement: HTMLLinkElement | null): string => {
    if (linkElement) {
      const href = linkElement.getAttribute('href')
      if (href) {
        return href.startsWith('/') ? `${domain}${href}` : href
      }
    }
    return ''
  }

  const svgFavicon = doc.querySelector(
    'link[rel="icon"][type="image/svg+xml"], link[rel="apple-touch-icon"][type="image/svg+xml"]'
  )
  if (svgFavicon) {
    return getFaviconUrl(svgFavicon as HTMLLinkElement)
  }

  const pngFavicon = doc.querySelector(
    'link[rel="icon"][type="image/png"], link[rel="apple-touch-icon"][type="image/png"]'
  )
  if (pngFavicon) {
    return getFaviconUrl(pngFavicon as HTMLLinkElement)
  }

  const fallbackFavicon = doc.querySelector(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
  )
  if (fallbackFavicon) {
    return getFaviconUrl(fallbackFavicon as HTMLLinkElement)
  }

  return `${domain}/favicon.ico`
}

const getDocument = async (html: string) => {
  const doc = htmlToDocument(html)
  cleanDoc(doc)
  return doc
}

const parseWebpage = async (url: string): Promise<ParsedWebpage | undefined> => {
  try {
    const domain = getDomain(url)
    const html = await getHtml(url)
    const doc = await getDocument(html)
    const faviconUrl = parseFaviconUrl(url, doc)
    const reader = new Readability(doc)
    return {
      ...reader.parse(),
      originalHtml: html,
      domain,
      faviconUrl,
      originalUrl: url
    }
  } catch (error) {
    console.error('Ошибка при извлечении контента:', error)
    return undefined
  }
}

export default parseWebpage
