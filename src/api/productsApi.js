const BASE = 'https://dummyjson.com'

// Fields fetched for product listings (product detail page fetches the full object)
const SELECT = 'id,title,price,thumbnail,category,description,rating,stock'

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Request failed (${res.status})`)
  }
  return res.json()
}

export const getProducts = ({ limit = 12, skip = 0, sortBy = 'title', order = 'asc' } = {}) =>
  fetch(`${BASE}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=${SELECT}`)
    .then(handleResponse)

export const searchProducts = (query, { limit = 12, skip = 0, sortBy = 'title', order = 'asc' } = {}) =>
  fetch(`${BASE}/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=${SELECT}`)
    .then(handleResponse)

export const getCategories = () =>
  fetch(`${BASE}/products/categories`)
    .then(handleResponse)

export const getProductsByCategory = (category, { limit = 12, skip = 0, sortBy = 'title', order = 'asc' } = {}) =>
  fetch(`${BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=${SELECT}`)
    .then(handleResponse)

export const getProduct = (id) =>
  fetch(`${BASE}/products/${id}`)
    .then(handleResponse)

