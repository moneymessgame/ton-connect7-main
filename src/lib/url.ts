export const isExternalLink = (href: string): boolean => {
  return href.startsWith("http") || href.startsWith("https")
}

export const convertSlug = (word: string): string => {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export const createUrl = (array: string[]): string => {
  return `/${array.map(convertSlug).join("/")}`
}
