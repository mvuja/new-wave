/**
 * Converts a product title to a URL-friendly slug.
 * e.g. "Apple iPhone 14 Pro!" → "apple-iphone-14-pro"
 */
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // strip non-alphanumeric (keep spaces + hyphens)
    .trim()
    .replace(/\s+/g, '-')           // spaces → hyphens
    .replace(/-+/g, '-')            // collapse multiple hyphens

/**
 * Builds the full URL-safe product param: "apple-iphone-14-pro-52"
 * The ID is always the last segment after the final hyphen.
 */
export const toProductSlug = (title, id) => `${slugify(title)}-${id}`

/**
 * Extracts the numeric product ID from a slug param.
 * "apple-iphone-14-pro-52" → 52
 */
export const idFromSlug = (slug) => {
  const parts = slug.split('-')
  return parseInt(parts[parts.length - 1], 10)
}

